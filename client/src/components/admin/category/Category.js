import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../../api/nodejs/categories";
import ProductCard from "../../../../src/components/admin/product/ProductCard";

const Category = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setIsLoading(true);
    getCategory(slug).then((res) => {
      setIsLoading(false);
      setCategory(res.data);
    });
  }, []);

  return (
    <>
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        <h1>{slug}</h1>
      </div>
    </>
  );
};

export default Category;
