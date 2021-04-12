import React from "react";

const PaymentInformation = ({ order, currentStatus = true }) => {
  return (
    <div>
      <p>
        <span>
          <b>Order ID: </b>
          {order.paymentIntent.id}
        </span>
      </p>
      <p>
        <span>
          <b>Order Date: </b>
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
      </p>
      <p>
        <span>
          <b>Amount: </b>
          {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>{" "}
        <span>{order.paymentIntent.currency.toUpperCase()}</span>
      </p>
      <p>
        <span>
          <b>Payment Method: </b>
          {order.paymentIntent.payment_method_types[0]}
        </span>
      </p>
      <p>
        <span>
          {order.paymentIntent.status === "succeeded" ? (
            <p>
              <b>Transaction Status: </b>
              <span className="badge bg-success text-white">
                {order.paymentIntent.status}
              </span>
            </p>
          ) : (
            <p>
              <b>Transaction Status: </b>
              <span className="badge bg-danger text-white">
                {order.paymentIntent.status}
              </span>
            </p>
          )}
        </span>
      </p>
      {currentStatus && (order.Status === "Not Processed" || "Cancelled") ? (
        <p>
          <b>Order Status: </b>
          <span className="badge bg-danger text-white">
            {order.orderStatus}
          </span>
        </p>
      ) : (
        <p>
          <b>Order Status: </b>
          <span className="badge bg-danger text-white">
            {order.orderStatus}
          </span>
        </p>
      )}

      {/* {order.orderStatus === "Not Processed" ? (
        <p>
          <b>Order Status: </b>
          <span className="badge bg-danger text-white">
            {order.orderStatus}
          </span>
        </p>
      ) : (
        <p>
          <b>Order Status: </b>
          <span className="badge bg-danger text-white">
            {order.orderStatus}
          </span>
        </p>
      )} */}
    </div>
  );
};

export default PaymentInformation;
