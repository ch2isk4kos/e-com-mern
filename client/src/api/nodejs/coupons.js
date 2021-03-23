import axios from "axios";
const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const getCoupons = async () => {
  return await axios.get(`${NODE_API}/coupons`);
};

export const createCoupon = async (coupon, token) => {
  return await axios.post(
    `${NODE_API}/coupon/${couponId}`,
    { coupon },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const removeCoupon = async (couponId, token) => {
  return await axios.delete(`${NODE_API}/coupon/${couponId}`, {
    headers: {
      auth: token,
    },
  });
};
