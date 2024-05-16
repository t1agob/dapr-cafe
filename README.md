# Dapr Cafe
[![Deploy to Azure](https://github.com/t1agob/dapr-cafe/actions/workflows/azure-static-web-apps-orange-tree-098987f0f.yml/badge.svg)](https://github.com/t1agob/dapr-cafe/actions/workflows/azure-static-web-apps-orange-tree-098987f0f.yml)

## Overview

Most companies today are Software companies in a sense that their business is heavily dependent on Software components built in-house or acquired to other companies.

Modern Software is usually built in a global and distributed way, and leverages several technologies and platforms to make sure businesses have a broader reach and access to more customers. This increases the systems complexity and makes it harder to maintain them in the long run.

One of the main challenges that teams face is getting stuck to decisions they make. If you choose a Cloud or Database provider you are typically going to stay with it for a long time. This fact is usually driven by the complexity of moving between platforms and it is a major factor when making architectural and platform decisions.

The role of [Dapr](https://docs.dapr.io/) is to facilitate the process of building distributed applications by abstrating the platform components. This makes it almost seamless to move between providers without code changes. It also simplifies the code required to integrate with databases, pubsub platforms and others, while enforcing best practices for distributed platforms such as retrying failed requests automatically.

With this demo we try to cover some of the aspects and complexities of event-driven systems and show how Dapr overcomes them.

## The application

This demo is provides a frontend application for easy interaction with the platform. In the frontend application you can choose to go through the customer experience or employee experience (work in progress). As a customer you can select food and drinks from a list of items and submit your order. After the order is submitted the employee will work on completing the order and completing the request for you.

![webpage-screenshot](/img/webapp-capture.png)

The backend side of the application is a distributed system built in a microservices approach with pluggable components provided by Dapr which makes it easier to swap providers without code changes.

This provides great developer experience as you can use some components locally but other providers when deploying to your production environment (e.g. [Azure Kubernetes Services](https://azure.microsoft.com/en-us/products/kubernetes-service) cluster in Microsoft Azure).

![local-vs-prod](/img/local-vs-prod.png)

## How your events flow

When you submit and order from the frontend component (not using Dapr) a request is sent to the order management service that publishes a message to a pubsub topic with the order details.

This message is then processed by the order-processor service that is active listening to events sent to a topic. This service checks if the order information received is already being processed or not to ensure [idempotency](https://martinfowler.com/articles/patterns-of-distributed-systems/idempotent-receiver.html). This is very important to ensure that we don't process the same order more than once when a potential retry occurs.

Once the order is validated, the order information is persisted in the state store for employee processing.

The stored information can be queried or updated from the order management service.

![high-level-architecture](/img/architecture%20diagram.png)

The order management service also leverages a secret store component that contains secrets to be used at runtime. This component allows developers to abstract the platform where they are storing their secrets in (e.g Azure Key Vault, Dapr local secret store, ...).

Now that you understand how we built the demo, give it a go!

## Setup

This repository contains all the components necessary to deploy locally or to Azure Kubernetes Service in Microsoft Azure. Follow the steps below to deploy the application.

### In a local environment

1. Fork and Clone project locally
   [Open the project](https://github.com/t1agob/dapr-cafe) and fork it to your own GitHub account.

   Then clone the project locally.

   ```bash
   git clone https://github.com/[YOUR-GITHUB-ACCOUNT]/dapr-cafe
   ```

2. [Install Dapr cli](https://docs.dapr.io/getting-started/install-dapr-cli/) (if you haven't done so)
3. [Iniatilize Dapr](https://docs.dapr.io/getting-started/install-dapr-selfhost/) in your local environment
4. Run all services with [multi-app run](https://docs.dapr.io/developing-applications/local-development/multi-app-dapr-run/multi-app-overview/)
   In your project root run the following command to deploy all services and components required to run you application.

   ```bash
    dapr run -f . 
   ```

This will run your services and expose their logs in the terminal automatically.

### In Microsoft Azure

To deploy in Microsoft Azure there are a few manual steps that are not covered in this repository. Make sure you do them before deploying the environment to Microsoft Azure.

   1. [Create AKS cluster](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli)
   2. [Create Azure Container Registry](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-portal?tabs=azure-cli)
   3. [Create Azure Static Web App](https://learn.microsoft.com/en-us/azure/static-web-apps/get-started-portal?tabs=vanilla-javascript&pivots=github)
   4. [Create Azure CosmosDB](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/quickstart-portal) (SQL API) to be used as our state store
   5. In AKS
      1. [Deploy Redis](https://techcommunity.microsoft.com/t5/apps-on-azure-blog/run-scalable-and-resilient-redis-with-kubernetes-and-azure/ba-p/3247956)
      2. Create secrets required by components

            **REDIS**

            ```bash
            kubectl create secret generic redis-secret --from-literal=REDIS_PASSWORD="[YOUR-REDIS-PASSWORD]" 
            ```

            **COSMOS DB**

            ```bash
            kubectl create secret generic cosmosdb-creds --from-literal=COSMOSDB_URL="[YOUR-COSMOSDB-URL]" --from-literal=COSMOSDB_MASTER_KEY="[YOUR-COSMOSDB-KEY]" --from-literal=COSMOSDB_DATABASE="[YOUR-COSMOSDB-DATABASE]" --from-literal=COSMOSDB_COLLECTION="[YOUR-COSMOSDB-COLLECTION]"
            ```

   6. On GitHub, add the following secrets used by GitHub actions for Azure Container Registry and Kubeconfig.

   ![github-secrets](/img/github-secrets.png)

    **Warning:** Secret names are case sensitive. Make sure you get the casing right to avoid errors when running GitHub actions.

   7. Run GitHub action to deploy services and components to Azure.

   The existing GitHub action can be triggered by pushing any code change to the *main* branch.

   8. After deployment is successful, go to azure static apps and open browser

## Summary

I hope you had fun playing with Dapr locally and you were able to deploy it to Azure and see that you can easily swap the components with zero code changes and it still worked.
