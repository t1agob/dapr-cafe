package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	dapr "github.com/dapr/go-sdk/client"
	"github.com/dapr/go-sdk/service/common"
	daprd "github.com/dapr/go-sdk/service/http"
)

type Order struct {
	Customer_email string   `json:"customer_email"`
	Id             string   `json:"id"`
	Status         string   `json:"status"`
	Items          []string `json:"items"`
}

var subscribeToNewOrders = &common.Subscription{
	PubsubName: "orderpubsub",
	Topic:      "orders",
	Route:      "/order",
}

var subscribeToOrderCompleteUpdate = &common.Subscription{
	PubsubName: "orderpubsub",
	Topic:      "completeorder",
	Route:      "/complete",
}

var stateStoreName = "statestore"
var client dapr.Client

func main() {
	appPort := os.Getenv("APP_PORT")
	if appPort == "" {
		appPort = "30000"
	}

	client, _ = dapr.NewClient()

	// Create server and add a topic listener
	s := daprd.NewService(":" + appPort)

	// Add topic subscriptions
	// Subscribe to new orders
	err := s.AddTopicEventHandler(subscribeToNewOrders, newOrderEventHandler)
	if err != nil {
		log.Printf("error adding topic subscription: %v", err)
	}

	// Subscribe to order status updates
	err = s.AddTopicEventHandler(subscribeToOrderCompleteUpdate, orderUpdateEventHandler)
	if err != nil {
		log.Printf("error adding topic subscription: %v", err)
	}

	// Start the server
	err = s.Start()
	if err != nil {
		log.Printf("error listening: %v", err)
	}

	fmt.Println("Order Processor is up and running...")
}

func newOrderEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {
	// Unmarshal the order
	var orderData Order
	err = json.Unmarshal(e.RawData, &orderData)
	if err != nil {
		log.Printf("error unmarshalling order: %v", err)
	}

	// check if order already exists - idempotency
	clientOrder, err := client.GetState(ctx, stateStoreName, orderData.Id, nil)
	if err != nil {
		log.Printf("error getting order state: %v", err)
	}

	if clientOrder.Value != nil {
		fmt.Println("Order with ID: ", orderData.Id, "is a duplicate...skipping")
		return false, nil
	}

	// Persist the order initial state
	orderData.Status = "In Progress"

	data, err := json.Marshal(orderData)
	if err != nil {
		log.Printf("error marshalling order: %v", err)
	}

	fmt.Println("Saving order state: ", orderData.Id)
	err = client.SaveState(ctx, stateStoreName, "orderprocessor", data, nil)
	if err != nil {
		log.Printf("error saving order state: %v", err)
	}

	return false, nil
}

func orderUpdateEventHandler(ctx context.Context, e *common.TopicEvent) (retry bool, err error) {

	fmt.Println("Order status update received", e.Data)

	// Unmarshal the order
	var orderId string
	err = json.Unmarshal(e.RawData, &orderId)
	if err != nil {
		log.Printf("error unmarshalling order: %v", err)
	}

	// Get order state
	result, err := client.GetState(ctx, stateStoreName, orderId, nil)
	if err != nil {
		log.Printf("error getting order state: %v", err)
	}

	var storedOrder Order
	json.Unmarshal(result.Value, &storedOrder)

	storedOrder.Status = "Completed"

	data, err := json.Marshal(storedOrder)
	if err != nil {
		log.Printf("error marshalling order: %v", err)
	}

	fmt.Println("Completing order: ", storedOrder.Id)
	err = client.SaveState(ctx, stateStoreName, storedOrder.Id, data, nil)
	if err != nil {
		log.Printf("error saving order state: %v", err)
	}

	fmt.Println("Order status update received: ", storedOrder.Id, storedOrder.Status)

	return false, nil
}
