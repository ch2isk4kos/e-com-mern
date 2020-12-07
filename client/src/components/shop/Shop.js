import React, { useState, useEffect } from "react";
import { useSelector, useDipatch } from "react-redux";
import { getProductsByCount } from "../../api/nodejs/products";
import ProductCard from "../admin/product/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Advanced Search</h4>
        </div>
        <div className="col-md-9">
          {isLoading ? <h4>Loading...</h4> : <h4 className="mt-3">Products</h4>}
          {products.length < 1 && <p>No Products Found</p>}
          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
