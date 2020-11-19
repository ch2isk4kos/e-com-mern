import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

// index
export const getSubCategories = async () => {
  return await axios.get(`${NODE_API}/subs`);
};

// create
export const createSubCategory = async (sub, token) => {
  return await axios.post(`${NODE_API}/sub`, sub, {
    headers: {
      auth: token,
    },
  });
};

// read
export const getSubCategory = async (slug) => {
  return await axios.get(`${NODE_API}/sub/${slug}`);
};

// update
export const updateSubCategory = async (slug, sub, token) => {
  return await axios.put(`${NODE_API}/sub/${slug}`, sub, {
    headers: {
      auth: token,
    },
  });
};

// delete
export const deleteSubCategory = async (slug, token) => {
  return await axios.post(`${NODE_API}/sub/${slug}`, {
    headers: {
      auth: token,
    },
  });
};
