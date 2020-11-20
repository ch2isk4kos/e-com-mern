import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  createProduct,
  removeProduct,
} from "../../../api/nodejs/products";
import { toast } from "react-toastify";
import AdminNav from "../AdminNav";

const initState = {
  name: "",
  price: "",
  description: "",
  colors: ["red", "green", "blue", "yellow"],
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
  // const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const p = await getProducts();
    return setProducts(p.data);
  };

  const handleOnChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setProduct({ [e.target.name]: e.target.value });
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

    createProduct({ name }, user.token)
      .then((res) => {
        setIsLoading(false);
        setProduct("");
        loadProducts();
        toast.success(`${res.data.name} succressfully created`);
      })
      .catch((err) => {
        setIsLoading(true);
        if (err.response.status === 400)
          toast.error("Create Category Error:", err.response.data);
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

  const {
    name,
    price,
    description,
    colors,
    color,
    brands,
    brand,
    images,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
  } = product;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? <h1>Loading...</h1> : <h1>Create Product</h1>}
          {/* Create Category Form */}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                {/* Product Name */}
                <>
                  <label>Product Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    autoFocus
                    required
                  />
                </>
                {/* Price */}
                <>
                  <label>Price</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="0.00"
                    name="price"
                    value={price}
                    onChange={handleOnChange}
                    required
                  />
                </>
                {/* Color */}
                <>
                  <label>Color</label>
                  <select
                    className="form-control"
                    name="color"
                    onChange={handleOnChange}
                  >
                    <option>Select</option>
                    {colors.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </>
                {/* <select id="" name="category">
                  <option value={category}>Select Category</option>
                </select> */}
                {/* Brand */}
                <>
                  <label>Brand</label>
                  <select
                    className="form-control"
                    name="brand"
                    onChange={handleOnChange}
                  >
                    <option>Select</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </>
                {/* Shipping */}
                <>
                  <label>Shipping</label>
                  <select
                    className="form-control"
                    name="shipping"
                    onChange={handleOnChange}
                  >
                    <option>Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </>
                <>
                  <label>Quantity</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="0"
                    name="quantity"
                    value={quantity}
                    onChange={handleOnChange}
                  />
                </>
                <>
                  <labeel>Description</labeel>
                  <textarea
                    className="form-control"
                    type="text"
                    rows={5}
                    cols={5}
                    name="description"
                    value={description}
                    onChange={handleOnChange}
                  />
                </>

                <button className="btn btn-primary m-3" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
          <hr />
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
