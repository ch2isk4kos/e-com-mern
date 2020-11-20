import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategories } from "../../../api/nodejs/categories";
import {
  getSubCategories,
  getCategory,
  createSubCategory,
  deleteSubCategory,
} from "../../../api/nodejs/subCategories";
import AdminNav from "../AdminNav";

const CreateSubCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const loadSubCategories = () => {
    getSubCategories().then((s) => setSubCategories(s.data));
  };

  const handleOnSelect = (e) => {
    setCategory(e.target.value);
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setIsLoading(false);
        setName("");
        loadSubCategories();
        toast.success(`${res.data.name} successfully created!`);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleOnDelete = async (slug) => {
    if (window.confirm("Confirm Deletion")) {
      setIsLoading(true);

      deleteSubCategory(slug, user.token)
        .then((res) => {
          setIsLoading(false);
          loadSubCategories();
          toast.error(`${res.data.name} successfully deleted.`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setIsLoading(false);
            toast.error(`${err.response.data}`);
          }
        });
    }
  };

  const handleOnSearch = (e) => {
    setQuery(e.target.value);
  };

  const querySearch = (query) => {
    return (c) => c.name.toLowerCase().includes(query);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? <h1>Loading...</h1> : <h1>Create Sub Category</h1>}
          {/* Category Dropdown */}
          <div className="form-group">
            <label className="mr-2">Category</label>
            <select
              className="mb-3"
              name="category"
              onChange={handleOnSelect}
              required
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
          {/* Create Category Form */}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="new sub-category name"
                  value={name}
                  onChange={handleOnChange}
                  autoFocus
                  required
                />
                <button className="btn btn-primary m-3" type="submit">
                  Enter
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
              placeholder={`search sub-category: ${subCategories.length}`}
              value={query}
              onChange={handleOnSearch}
            />
          </div>
          {/* Categories */}
          <div className="container">
            {subCategories &&
              subCategories.filter(querySearch(query)).map((sub) => (
                <div className="alert alert-primary" key={sub._id}>
                  {sub.name}
                  <button
                    className="btn btn-sm btn-danger ml-1 float-right"
                    onClick={() => handleOnDelete(sub.slug)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-sm btn-primary mr-1 float-right"
                    to={`/admin/sub/${sub.slug}`}
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

export default CreateSubCategory;
