import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCategories,
  createCategory,
  removeCategory,
} from "../../../api/nodejs/categories";
import AdminNav from "../AdminNav";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const c = await getCategories();
    return setCategories(c.data);
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnDelete = async (slug) => {
    console.log("DELETING", slug);
    if (window.confirm("Are You Sure?")) {
      setIsLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setIsLoading(false);
          toast.success(`${res.data.name} Deleted Succesfully`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("DELETION ERROR!!!");
            setIsLoading(true);
            toast.error("DELETE", err.response.data);
          }
        });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Creating:", name);

    setIsLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setIsLoading(false);
        toast.success(`${res.data.name} succressfully created`);
        setName("");
      })
      .catch((err) => {
        setIsLoading(true);
        console.log("Create Category", err);
        if (err.response.status === 400)
          toast.error("Create Category", err.response.data);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? <h1>Loading...</h1> : <h1>Create Category</h1>}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="input category name"
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
          <h3>Categories: {categories.length}</h3>
          <div className="container">
            {categories &&
              categories.map((category) => (
                <div className="alert alert-primary" key={category._id}>
                  {category.name}
                  <button
                    className="btn btn-sm btn-danger ml-1 float-right"
                    onClick={() => handleOnDelete(category.slug)}
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-sm btn-primary mr-1 float-right"
                    to={`/admin/category/${category.slug}`}
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

export default CreateCategory;
