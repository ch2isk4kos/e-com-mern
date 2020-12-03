import React, { useState, useEffect } from "react";
import Jumbotron from "./Jumbotron";
import ProductCard from "../admin/product/ProductCard";
import ProductCardLoad from "../admin/product/ProductCardLoad";
import { getProducts, listProducts } from "../../api/nodejs/products";

const Home = () => {
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
      <div
        className="jumbotron mb-5"
        style={{
          background: "WhiteSmoke",
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
      <div
        className="p-3 mt-3 mb-3 display-4"
        style={{ background: "WhiteSmoke" }}
      >
        New Arrivals
      </div>
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

export default Home;
