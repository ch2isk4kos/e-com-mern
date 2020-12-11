import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const userCheckout = async (cart, token) => {
  await axios.post(
    `${NODE_API}/user/cart`,
    { cart },
    {
      header: {
        auth: token,
      },
    }
  );
};
