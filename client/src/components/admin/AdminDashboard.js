import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import AdminProductCard from "./AdminProductCard";
import { getProductsByCount } from "../../api/nodejs/products";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setIsLoading(true);
    getProductsByCount(12)
      .then((res) => {
        console.log("Products:", res.data);
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Admin Dashboard</h1>
          <div className="row">
            {isLoading ? <h4>Loading...</h4> : <h4>Products</h4>}
          </div>
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <AdminProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
