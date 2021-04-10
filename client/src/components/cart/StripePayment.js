import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/nodejs/stripe";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      //get result of payment process success && create/save order to mongo atlas for admin to process
      // console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setIsSuccess(true);
      //empty cart from redux store and local storage
    }
  };

  const handleOnChange = async (e) => {
    //listen for changes in stripe card element && display errors as user inputs data
    setIsDisabled(e.empty); //disable pay button if error is present
    setError(e.error ? e.error.message : ""); //show error message
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
      <p className={isSuccess ? "result-message" : "result-message hidden"}>
        Successful Payment.{" "}
        <Link to="/user/history">See your purchase history.</Link>
      </p>
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
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </>
  );
};

export default StripePayment;
