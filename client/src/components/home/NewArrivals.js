import React, { useState, useEffect } from "react";
import ProductCard from "../admin/product/ProductCard";
import ProductCardLoad from "../admin/product/ProductCardLoad";
import { listProducts, tallyProducts } from "../../api/nodejs/products";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [tally, setTally] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    tallyProducts().then((res) => setTally(res.data));
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    listProducts("createdAt", "desc", page).then((res) => {
      setIsLoading(false);
      setProducts(res.data);
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
      <div className="container">
        <nav className="row">
          <Pagination
            className="mt-3 mb-5"
            current={page}
            total={(tally / 3) * 10}
            onChange={(v) => setPage(v)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
