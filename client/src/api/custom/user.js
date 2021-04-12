import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const userCart = async (cart, token) => {
  return await axios.post(
    `${NODE_API}/user/cart`,
    { cart },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const getUserCart = async (token) => {
  return await axios.get(`${NODE_API}/user/cart`, {
    headers: {
      auth: token,
    },
  });
};

export const emptyUserCart = async (token) => {
  return await axios.delete(`${NODE_API}/user/cart`, {
    headers: {
      auth: token,
    },
  });
};

export const applyCoupon = async (token, coupon) => {
  return await axios.post(
    `${NODE_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const userAddress = async (token, address) => {
  return await axios.post(
    `${NODE_API}/user/address`,
    { address },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const createOrder = async (token, stripeResponse) => {
  return await axios.post(
    `${NODE_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const getUserOrders = async (token) => {
  return await axios.get(`${NODE_API}/user/orders`, {
    headers: { auth: token },
  });
};

export const getUserWishlist = async (token) => {
  return await axios.get(`${NODE_API}/user/wishlist`, {
    headers: { auth: token },
  });
};

export const addWishlistItem = async (token, productId) => {
  return await axios.post(
    `${NODE_API}/user/wishlist`,
    { productId },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const updateUserWishlist = async (token, productId) => {
  return await axios.put(
    `${NODE_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        auth: token,
      },
    }
  );
};
