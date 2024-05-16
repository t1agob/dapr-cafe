// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { DaprClient } from "@dapr/dapr";
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

import { Order } from "./types";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const daprHost = process.env.DAPR_HOST ?? "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT ?? "40100";
const httpServerPort = process.env.PORT ?? "40000";

const DAPR_SECRET_STORE = "secretstore";
let pubSubName = "";
let newOrderPubSubTopic = "";
let completeOrderPubSubTopic = "";
let stateStoreName = "";

let isInitialized = false;

const client = new DaprClient({ daprHost, daprPort });

async function getSecrets() {
    if(pubSubName === "" || newOrderPubSubTopic === "" || completeOrderPubSubTopic === "" || stateStoreName === "") {
        pubSubName = JSON.stringify(await client.secret.get(DAPR_SECRET_STORE, "pubSubName"));
        newOrderPubSubTopic = JSON.stringify(await client.secret.get(DAPR_SECRET_STORE, "newOrderPubSubTopic"));
        completeOrderPubSubTopic = JSON.stringify(await client.secret.get(DAPR_SECRET_STORE, "completeOrderPubSubTopic"));
        stateStoreName = JSON.stringify(await client.secret.get(DAPR_SECRET_STORE, "stateStoreName"));

        isInitialized = true;
    }
}

// GET all orders
app.get("/order", async (req: Request, res: Response) => {
    console.log("Getting all orders");

    if(!isInitialized) {
        await getSecrets();
    }

    const result = await client.state.query(stateStoreName, {
        filter: {
            "EQ": { "status": "In Progress" }
        },
        sort: [
            {
                "key": "id"
            }
        ],
        page: {
            limit: 3
        }
    });

    console.log(result.results);

    return res.status(200).send(result.results);
});

// GET order by id
app.get("/order/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).send("Id is required");
    }

    if (!isInitialized) {
        await getSecrets();
    }

    console.log(req.params.id);
    const result = await client.state.get(stateStoreName, req.params.id);
    if (result === null || result === undefined || result === "") {
        return res.status(404).send("Order not found");
    }

    return res.status(200).send(result);
});

// POST new order
app.post("/order", async (req: Request, res: Response) => {
    console.log(req.body);
    if(!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send("Order payload is required");
    }

    if (!isInitialized) {
        await getSecrets();
    }

    const orderId = uuidv4();
    const order: Order = {
        id: orderId,
        customer_email: req.body.customer_email,
        items: req.body.items
    };

    const result = await client.pubsub.publish(pubSubName, newOrderPubSubTopic, order);

    if( result.error ) {
        res.status(500).send(result.error);
    }
    else {
        res.status(201).send({
            id: orderId
        });
    }
});

// PUT update order by id
app.put("/order/:id/complete", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).send("Order ID is required");
    }

    if (!isInitialized) {
        await getSecrets();
    }
    
    const orderId = req.params.id;
    
    const result = await client.pubsub.publish(pubSubName, completeOrderPubSubTopic, orderId);

    if (result.error) {
        res.status(500).send(result.error);
    }

    res.status(200).send("Order completed!");
});

app.listen(httpServerPort, () => {
    console.log(`[server]: Server is now running at http://localhost:${httpServerPort}`);
});