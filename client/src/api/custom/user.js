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
