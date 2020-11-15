import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

export const createOrUpdateUser = async (token) => {
  return await axios.post(
    `${NODE_API}/create-or-update-user`,
    {},
    {
      headers: {
        auth: token,
      },
    }
  );
};
