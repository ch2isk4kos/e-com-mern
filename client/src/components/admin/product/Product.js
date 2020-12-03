import React, { useState, useEffect } from "react";
import { getProduct } from "../../../api/nodejs/products";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  return <div>{JSON.stringify(product)}</div>;
};

export default Product;
