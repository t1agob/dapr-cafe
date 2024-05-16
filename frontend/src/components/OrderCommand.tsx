import { Button } from "@headlessui/react";
import { useState } from "react";

const API_URL = process.env.API_URL ?? "https://cors-anywhere.herokuapp.com/http://51.8.246.178";

type Props = {
  food: string;
  drink: string;
  email: string;
};

type SubmitOrderResponse = {
  id: string;
};

function OrderCommand({ food, drink }: Props) {
  console.log("API URL: " + process.env.API_URL);

  const [orderId, setOrderId] = useState("");

  async function submitOrder() {
    const response = await fetch(
      `${API_URL}/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          origin: "daprcafe",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          customer_email: "john.doe@email.com",
          items: [food, drink],
        }),
      }
    );

    const order: SubmitOrderResponse = await response.json();

    setOrderId(order.id);
  }

  return (
    <>
      {(food !== "" && drink !== "") ? (
        <div className="bg-red-500 opacity-90 h-14 sticky top-0 bottom-0 flex flex-col items-center">
          {orderId !== "" ? (
            <>
              <p className="text-white font-semibold text-2xl mt-1">
                Order submitted. We will get back to you shortly. Thank you!
              </p>
              <p className="text-white font-semibold text-xs">
                Order ID: {orderId}
              </p>
            </>
          ) : (
            <Button
              onClick={submitOrder}
              className="bg-red-100 font-semibold mt-3 text-red-900 rounded-md text-2xl w-80"
            >
              Order
            </Button>
          )}
        </div>
      ):
      (
        <>
        </>
      )}
    </>
  );
}

export default OrderCommand;
