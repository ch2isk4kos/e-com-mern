import React, { useState, useEffect } from "react";
import ProductCard from "../admin/product/ProductCard";
import ProductCardLoad from "../admin/product/ProductCardLoad";
import { listProducts } from "../../api/nodejs/products";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    listProducts("createdAt", "desc", 3).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div className="row pb-5">
            <ProductCardLoad count={3} />
          </div>
        ) : (
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewArrivals;