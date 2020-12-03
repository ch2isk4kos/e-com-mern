import React, { useState, useEffect } from "react";
import ProductInfoCard from "../product/ProductInfoCard";
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

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductInfoCard product={product} />
      </div>
    </div>
  );
};

export default Product;
