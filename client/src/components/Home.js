import React, { useState, useEffect } from "react";
import { getProducts, getProductsByCount } from "../api/nodejs/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
