import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const getAdminOrders = async (token) => {
  return await axios.get(`${NODE_API}/admin/orders`, {
    headers: { auth: token },
  });
};

export const updateAdminOrderStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    `${NODE_API}/admin/status`,
    { orderId, orderStatus },
    {
      headers: {
        auth: token,
      },
    }
  );
};
