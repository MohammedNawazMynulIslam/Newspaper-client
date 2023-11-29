import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import React from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
    } else {
      console.log("payment method", paymentMethod);
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Thank you for your payment.",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: { fontSize: "18px", color: "#424700" },
            "::placeholder": { color: "#aab7c4" },
          },
        }}
      ></CardElement>
      <button
        className="my-4 btn bg-blue-500 p-2 rounded-md text-white"
        type="submit"
      >
        Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
