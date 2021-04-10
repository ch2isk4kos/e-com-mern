import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePayment from "./StripePayment";
import "../../styles/stripe.css";

//load stripe outside of Payment component to avoid recreating stripe object on each render
const promise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h3>Stripe Payment</h3>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripePayment />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
