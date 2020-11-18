import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
          {categories.length}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
