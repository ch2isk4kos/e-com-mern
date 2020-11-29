import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

// index
export const getCategories = async () => {
  return await axios.get(`${NODE_API}/categories`);
};

// creete
export const createCategory = async (category, token) => {
  return await axios.post(`${NODE_API}/category`, category, {
    headers: {
      auth: token,
    },
  });
};

// read
export const getCategory = async (slug) => {
  return await axios.get(`${NODE_API}/category/${slug}`);
};

// update
export const updateCategory = async (slug, category, token) => {
  return await axios.put(`${NODE_API}/category/${slug}`, category, {
    headers: {
      auth: token,
    },
  });
};

// delete
export const removeCategory = async (slug, token) => {
  return await axios.delete(`${NODE_API}/category/${slug}`, {
    headers: {
      auth: token,
    },
  });
};

// get sub-categories
export const getSubCategories = async (_id) => {
  return await axios.get(`${NODE_API}/category/subs/${_id}`);
};
