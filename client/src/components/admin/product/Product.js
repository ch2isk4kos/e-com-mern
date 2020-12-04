import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductInfoCard from "../product/ProductInfoCard";
import { getProduct, rateProduct } from "../../../api/nodejs/products";

const Product = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  const handleOnRatingSelection = (selection, name) => {
    console.table("rating:", selection, "id:", name);
    setRating(selection);

    rateProduct(name, selection, user.token)
      .then((res) => {
        console.log("rating star clicked:", res.data);
        loadProduct();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <ProductInfoCard
          product={product}
          rating={rating}
          handleOnRatingSelection={handleOnRatingSelection}
        />
      </div>
      {JSON.stringify(product._id)}
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        Related Products
      </div>
    </div>
  );
};

export default Product;
