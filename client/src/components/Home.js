import React, { useState, useEffect } from "react";
import { getProducts, getProductsByCount } from "../api/nodejs/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(products)}
    </div>
  );
};

export default Home;
