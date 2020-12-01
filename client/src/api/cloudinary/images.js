import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

// upload images
export const uploadImages = async (uri, token) => {
  return await axios.post(
    `${NODE_API}/upload-images`,
    { image: uri },
    {
      headers: {
        auth: token,
      },
    }
  );
};
