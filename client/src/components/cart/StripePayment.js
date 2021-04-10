import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/nodejs/stripe";
import { useSelector, useDispatch } from "react-redux";

const StripePayment = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token).then((res) => {
      // const { payment } = res.data;
      // console.log(`create payment intent: ${payment}`);
      console.log("create payment intent: ", res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  const handleOnSubmit = async (e) => {
    //
  };

  const handleOnChange = async (e) => {
    //
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form id="payment-form" className="stripe-form" onSubmit={handleOnSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleOnChange}
        />
        <button
          className="stripe-button"
          disabled={processing || isDisabled || isSuccess}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner" pointer="cursor"></div>
            ) : (
              "Pay"
            )}
          </span>
        </button>
      </form>
    </>
  );
};

export default StripePayment;
