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
      setCategory(res.data.category);
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div
        className="p-3 mt-3 mb-3 display-5"
        style={{ background: "WhiteSmoke" }}
      >
        <h1>
          {category.name} ({products.length})
        </h1>
      </div>
      <div className="container">
        <div className="col">
          {isLoading ? (
            <h4>Loading...</h4>
          ) : (
            <>
              <h4>{products.length} Products Found</h4>
            </>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
