import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const userCheckout = async (cart, token) => {
  await axios.post(
    `${NODE_API}/user/checkout`,
    { cart },
    {
      headers: {
        auth: token,
      },
    }
  );
};

export const userCartResponse = async (token) => {
  await axios.get(`${NODE_API}/user/checkout`, {
    headers: {
      auth: token,
    },
  });
};
