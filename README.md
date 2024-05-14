# dapr-cafe
This is a demo scenario for Dapr

RUN ORDER MANAGEMENT LOCALLY
npm run dapr:start
OR
dapr run --app-port 3000 --app-id order-management --app-protocol http --dapr-http-port 3800 --resources-path ../components -- npm run start

RUN PROCESSOR LOCALLY
dapr run --app-port 6000 --app-id order-processor --dapr-http-port 6100 --resources-path ../components -- go run .
