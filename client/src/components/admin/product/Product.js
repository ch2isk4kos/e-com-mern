import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product/ProductCard";
import ProductCardLoad from "../product/ProductCardLoad";
import ProductInfoCard from "../product/ProductInfoCard";
import {
  getProduct,
  rateProduct,
  relatedProducts,
} from "../../../api/nodejs/products";

const Product = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [rating, setRating] = useState(0);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let currentRating = product.ratings.find(
        (rating) => rating.ratedBy.toString() === user._id.toString()
      );
      // current user rating
      currentRating && setRating(currentRating.rating);
    }
  }, [product, user]);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      relatedProducts(res.data._id).then((res) => setRelated(res.data));
    });
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
      <div className="container">
        <div className="row">
          {related.length ? (
            related.map((p) => (
              <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="col">No Related Products</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
