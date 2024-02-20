import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import { FaPaypal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiousSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiousSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1 ");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("Success");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent.id);
      setCardError(`Your transaction Id is ${paymentIntent.id}`);
      const paymentInfo = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: "Order Pending",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId),
      };

      console.log(paymentInfo);
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        alert("Payment Successfully!");
        navigate("/order");
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="font-semibold text-lg text-red">Order Summary</h4>
        <p>Total Price: PKR{price}</p>
        <p>Number of items: {cart.length}</p>
      </div>
      <div className="md:w-1/2 w-full space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8">
        <h4 className="font-semibold text-lg">Process Your Payment</h4>
        <h5 className="font-medium">Credit - Debit Card</h5>

        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 bg-red w-full text-white"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red italic text-sm">{cardError}</p>
        ) : (
          ""
        )}

        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            disabled={!stripe}
            className="btn bg-slate-800 btn-sm mt-5 text-white"
          >
            <FaPaypal /> Payment With PAYPAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
