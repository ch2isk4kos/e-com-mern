import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductForm from "./ProductForm";
import AdminNav from "../AdminNav";
import {
  getCategories,
  getSubCategories,
} from "../../../api/nodejs/categories";
import { getProduct, updateProduct } from "../../../api/nodejs/products";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const initState = {
  name: "",
  price: "",
  description: "",
  colors: ["Black", "Blue", "Green", "Grey", "Red", "Yellow"],
  color: "",
  brands: ["Apple", "Asus", "Microsoft"],
  brand: "",
  images: [],
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  purchased: "",
};

const UpdateProduct = ({ match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState(initState);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct({ ...product, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h1>Update Product</h1>
          {/* Update Product Form */}
          {JSON.stringify(product)}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
