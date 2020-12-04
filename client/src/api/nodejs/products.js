import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

// index
export const getProducts = async () => {
  return await axios.get(`${NODE_API}/products`);
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${NODE_API}/products/${count}`);
};

export const listProducts = async (sort, order, page) => {
  return await axios.post(`${NODE_API}/products/list`, {
    sort: sort,
    order: order,
    page: page,
  });
};

export const tallyProducts = async () => {
  return await axios.get(`${NODE_API}/products/tally`);
};

// creete
export const createProduct = async (product, token) => {
  return await axios.post(`${NODE_API}/product`, product, {
    headers: {
      auth: token,
    },
  });
};

// read
export const getProduct = async (slug) => {
  return await axios.get(`${NODE_API}/product/${slug}`);
};

// update
export const updateProduct = async (slug, product, token) => {
  return await axios.put(`${NODE_API}/product/${slug}`, product, {
    headers: {
      auth: token,
    },
  });
};

// delete
export const removeProduct = async (slug, token) => {
  return await axios.delete(`${NODE_API}/product/${slug}`, {
    headers: {
      auth: token,
    },
  });
};

// rating
export const rateProduct = async (productId, rating, token) => {
  return await axios.put(
    `${NODE_API}/product/${productId}/rating`,
    { rating },
    {
      headers: {
        auth: token,
      },
    }
  );
};
