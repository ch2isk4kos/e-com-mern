import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNav from "../AdminNav";
import AdminProductCard from "../AdminProductCard";
import {
  getProductsByCount,
  removeProduct,
} from "../../../api/nodejs/products";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

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

  const handleOnDelete = (slug) => {
    const slugName = slug.replace(/-/g, " ");
    let remove = window.confirm(`Delete ${slugName}?`);
    if (remove) {
      console.log("Delete", remove);
      removeProduct(slug, user.token)
        .then((res) => {
          loadProducts();
          toast.success(`${res.data.name} deleted successfully`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
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
                <AdminProductCard product={p} handleOnDelete={handleOnDelete} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
