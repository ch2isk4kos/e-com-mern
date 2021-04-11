import React, { useState, useEffect, createContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../api/nodejs/stripe";
import { createOrder, emptyUserCart } from "../../api/custom/user";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { CheckOutlined, DollarOutlined } from "@ant-design/icons";
import Sale from "../../assets/yard-sale.jpg";

const StripePayment = ({ history }) => {
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const [cartItems, setCartItems] = useState({});
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      // const { payment } = res.data;
      // console.log(`create payment intent: ${payment}`);
      console.log("create payment intent: ", res.data);
      setClientSecret(res.data.clientSecret);
      //response received from successful payment
      setCartItems(res.data.items);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  console.log("Cart Items", cartItems);
  console.log("After Discount", totalAfterDiscount);
  console.log("Payable", payable);

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
      createOrder(user.token, payload).then((res) => {
        if (res.data.ok === true) {
          //empty cart from local storage
          if (typeof window !== undefined) localStorage.removeItem("cart");
          //empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          //reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          //empty cart from database
          emptyUserCart(user.token);
        }
      });

      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setIsSuccess(true);
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
      {!isSuccess && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total After Discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Sale}
              style={{
                height: "50%",
                width: "50%",
                margin: "auto",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
              alt="Yard Sale"
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" />
              <br />
              Order Amount: ${cartItems.totalAmount}
            </>,
            <>
              <CheckOutlined className="text-info" />
              <br /> Total Cost: ${(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

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
