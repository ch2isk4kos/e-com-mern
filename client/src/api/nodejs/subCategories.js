import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

// index
export const getSubCategories = async () => {
  return await axios.get(`${NODE_API}/subs`);
};

// creete
export const createSubCategory = async (subCategory, token) => {
  return await axios.post(`${NODE_API}/sub`, subCategory, {
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
export const updateSubCategory = async (slug, subCategory, token) => {
  return await axios.put(`${NODE_API}/sub/${slug}`, subCategory, {
    headers: {
      auth: token,
    },
  });
};

// delete
export const removeSubCategory = async (slug, token) => {
  return await axios.delete(`${NODE_API}/sub/${slug}`, {
    headers: {
      auth: token,
    },
  });
};
