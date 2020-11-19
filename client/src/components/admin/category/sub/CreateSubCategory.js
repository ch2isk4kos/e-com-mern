import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSubCategories,
  createSubCategory,
  removeSubCategory,
} from "../../../../api/nodejs/subCategories";
import { getCategories } from "../../../../api/nodejs/categories";
import AdminNav from "../../AdminNav";
import { toast } from "react-toastify";

const CreateSubCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const c = await getCategories();
    return setCategories(c.data);
  };

  const handleOnSelect = (e) => {
    setCategory(e.target.value);
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    const q = e.target.value.toLowerCase();
    setQuery(q);
  };

  const querySearch = (query) => {
    return (c) => c.name.toLowerCase().includes(query);
  };

  const handleOnDelete = async (slug) => {
    if (window.confirm("Are You Sure?")) {
      setIsLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setIsLoading(false);
          loadCategories();
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setIsLoading(false);
        setName("");
        loadCategories();
        toast.success(`${res.data.name} succressfully created`);
      })
      .catch((err) => {
        setIsLoading(true);
        if (err.response.status === 400)
          toast.error("Create Category Error:", err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {/* Loading... */}
          {isLoading ? <h1>Loading...</h1> : <h1>Create Sub Category</h1>}
          {/* Category Dropdown */}
          <div className="form-group mb-3">
            <label className="mr-2">Category</label>
            <select
              className="form-conrol"
              name="category"
              onChange={handleOnSelect}
            >
              <option>Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {/* New Sub Category */}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="enter new sub category"
                  value={name}
                  onChange={handleOnChange}
                  autoFocus
                  required
                />
                <button className="btn btn-primary m-3" type="submit">
                  Submit
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
              placeholder={`search category: ${categories.length}`}
              value={query}
              onChange={handleOnSearch}
            />
          </div>
          {/* Categories */}
          <div className="container">
            {/* {categories &&
              categories.filter(querySearch(query)).map((category) => (
                <div className="alert alert-primary" key={category._id}>
                  {category.name}
                  <button
                    className="btn btn-sm btn-danger ml-1 float-right"
                    onClick={() => handleOnDelete(category.slug)}
                  >
                    Delete
                  </button>
                  <Link
                    to={"#"}
                    className="btn btn-sm btn-primary mr-1 float-right"
                  >
                    Edit
                  </Link>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
