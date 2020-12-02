import React, { useState, useEffect } from "react";
import ProductCard from "../components/admin/product/ProductCard";
import { getProducts, getProductsByCount } from "../api/nodejs/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Home</h1>
        {isLoading ? <h3>Loading</h3> : <h3>Shop Products</h3>}
        {/* {JSON.stringify(products)} */}
      </div>
      <div className="container">
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
