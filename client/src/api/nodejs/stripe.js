import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const createPaymentIntent = async (token, coupon) => {
  return await axios.post(
    `${NODE_API}/create-payment-intent`,
    { isCouponApplied: coupon },
    {
      headers: {
        auth: token,
      },
    }
  );
};
