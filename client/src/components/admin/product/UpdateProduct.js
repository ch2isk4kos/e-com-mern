import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import AdminNav from "../AdminNav";
import ProductUpdateForm from "./ProductUpdateForm";
import {
  getCategories,
  getSubCategories,
} from "../../../api/nodejs/categories";
// import { getSubCategories } from "../../../api/nodejs/subCategories";
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
  // categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  purchased: "",
};

const UpdateProduct = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState(initState);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryIDs, setSubCategoryIDs] = useState([]);
  const [categorySelect, setCategorySelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = async () => {
    await getProduct(slug).then((p) => {
      // set product to response data
      setProduct({ ...product, ...p.data });
      // load product instance sub categories
      getSubCategories(p.data.category._id).then((res) =>
        setSubCategories(res.data)
      );
      // prepare list of sub category ids of product instance
      let ids = [];
      p.data.subcategories.map((sub) => {
        ids.push(sub._id);
      });
      // this is for the purpose of ant design Select component
      setSubCategoryIDs((prev) => ids);
    });
  };

  const loadCategories = async () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleOnCategory = (e) => {
    console.log("Parent Category ID:", e.target.value);
    setProduct({ ...product, subcategories: [] });
    setCategorySelect(e.target.value);
    getSubCategories(e.target.value).then((res) => {
      console.log("Paretn Sub Categories:", res.data);
      setSubCategories(res.data);
    });

    // pre populates default sub categories if admin selects back to original category
    if (product.category._id === e.target.value) {
      loadProduct();
    }
    // clear default sub categories
    setSubCategoryIDs([]);
  };

  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    product.subcategories = subCategoryIDs;
    product.category = categorySelect ? categorySelect : product.category;
    updateProduct(slug, product, user.token)
      .then((res) => {
        setIsLoading(false);
        toast.success(`${res.data.name} updated successfully`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errMsg);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {isLoading ? <LoadingOutlined /> : <h1>Update Product</h1>}
          {/* Product Update Form */}
          {JSON.stringify(product)}
          <ProductUpdateForm
            product={product}
            setProduct={setProduct}
            categories={categories}
            subCategories={subCategories}
            subCategoryIDs={subCategoryIDs}
            setSubCategoryIDs={setSubCategoryIDs}
            categorySelect={categorySelect}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleOnCategory={handleOnCategory}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
