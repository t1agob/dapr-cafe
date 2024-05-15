import { Button } from '@headlessui/react'

type Props = {
  food: string;
  drink: string;
  email: string;
};



function OrderCommand({food, drink}: Props) {

  function submitOrder() {
    fetch("https://cors-anywhere.herokuapp.com/http://51.8.235.29/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        customer_email: "john.doe@email.com",
        items: [food, drink],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }  

  return (
    <div className="bg-red-500 opacity-90 h-14 sticky top-0 bottom-0 flex flex-col items-center">
      <Button
        onClick={submitOrder}
        disabled={food === "" || drink === ""}
        className="bg-red-100 font-semibold mt-3 text-red-900 rounded-md text-2xl w-80 disabled:opacity-60"
      >
        Order
      </Button>
    </div>
  );
}

export default OrderCommand