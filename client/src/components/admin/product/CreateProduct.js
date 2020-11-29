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
import AdminNav from "../AdminNav";
import ProductForm from "./ProductForm";

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

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState(initState);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSubCategories, setIsSubCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  // const loadCategories = async () => {
  //   const c = await getCategories();
  //   return setProduct({ ...product, categories: c.data });
  // };

  const loadCategories = async () => {
    getCategories().then((c) => setProduct({ ...product, categories: c.data }));
  };

  const loadProducts = async () => {
    const p = await getProducts();
    return setProducts(p.data);
  };

  const handleOnChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleOnCategory = (e) => {
    console.log("Parent Category ID:", e.target.value);
    setProduct({ ...product, category: e.target.value });
    getSubCategories(e.target.value)
      .then((res) => {
        console.log("Paretn Sub Categories:", res.data);
        setSubCategories(res.data);
      })
      .catch((err) => console.log("GET SUB CATEGORIES", err));
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    const q = e.target.value.toLowerCase();
    setQuery(q);
  };

  const querySearch = (query) => {
    return (c) => c.name.toLowerCase().includes(query);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createProduct(product, user.token)
      .then((res) => {
        console.log(res.data);
        window.alert(`Confirm ${res.data.name} Create`);
        window.location.reload();
        toast.success(`${res.data.name} succressfully created`);
      })
      .catch((err) => {
        setIsLoading(true);
        if (err.response.status === 400) toast.error(err.response.data.errMsg);
      });
  };

  const handleOnDelete = async (slug) => {
    if (window.confirm("Are You Sure?")) {
      setIsLoading(true);
      removeProduct(slug, user.token)
        .then((res) => {
          setIsLoading(false);
          loadProducts();
          toast.error(`${res.data.name} Deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setIsLoading(true);
            toast.error("DELETE ERROR:", err.response.data);
          }
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
          {isLoading ? <h1>Loading...</h1> : <h1>Create Product</h1>}
          {/* {JSON.stringify(product.categories)} */}
          {/* Create Product Form */}
          <ProductForm
            product={product}
            subCategories={subCategories}
            isSubCategories={isSubCategories}
            handleOnChange={handleOnChange}
            handleOnCategory={handleOnCategory}
            handleOnSubmit={handleOnSubmit}
          />
          {/* Search Bar */}
          <div className="col-md-3 ml-3">
            <input
              className="form-control mb-3"
              type="search"
              placeholder={`search product: ${products.length}`}
              value={query}
              onChange={handleOnSearch}
            />
          </div>
          {/* Products */}
          <div className="container">
            {products &&
              products.filter(querySearch(query)).map((product) => (
                <div className="alert alert-primary" key={product._id}>
                  {product.name}
                  <button
                    className="btn btn-sm btn-danger ml-1 float-right"
                    onClick={() => handleOnDelete(product.slug)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-sm btn-primary mr-1 float-right"
                    to={`/admin/product/${product.slug}`}
                  >
                    Edit
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
