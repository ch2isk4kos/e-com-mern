import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCategories,
  getSubCategories,
} from "../../../api/nodejs/categories";
import {
  getProducts,
  createProduct,
  removeProduct,
} from "../../../api/nodejs/products";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import AdminNav from "../AdminNav";
import ProductForm from "./ProductForm";

const UpdateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Update Product</h1>
          {/* Update Product Form */}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
