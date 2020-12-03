import React, { useState, useEffect } from "react";
import jumbotron from "./Jumbotron";
import ProductCard from "../components/admin/product/ProductCard";
import { getProducts, getProductsByCount } from "../api/nodejs/products";
import Jumbotron from "./Jumbotron";

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
      <div
        className="jumbotron"
        style={{
          background: "LightGrey",
          padding: "2em",
          fontSize: "4em",
          fontWeight: "bold",
        }}
      >
        <Jumbotron
          text={[
            "Yard Sale on Fire",
            "Built by Chris Kakos",
            "Powered by MongoDB and Google",
          ]}
        />
      </div>
      <div className="container">
        <div className="row">
          {isLoading ? <h3>Loading</h3> : <h3>Shop Products</h3>}
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
