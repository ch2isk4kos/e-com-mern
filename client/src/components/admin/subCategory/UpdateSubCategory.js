import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getCategories } from "../../../api/nodejs/categories";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../api/nodejs/subCategories";
import AdminNav from "../AdminNav";

const UpdateSubCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubCategory = () =>
    getSubCategory(match.params.slug).then((s) => {
      setName(s.data.name);
      setCategory(s.data.parent);
    });

  const handleOnSelect = (e) => {
    setCategory(e.target.value);
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    updateSubCategory(
      match.params.slug,
      { name: name, parent: category },
      user.token
    )
      .then((res) => {
        setIsLoading(false);
        setName("");
        history.push("/admin/sub");
        toast.success(`${res.data.name} successfully updated`);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? <h1>Loading...</h1> : <h1>Update Sub Category</h1>}
          {/* Category Dropdown */}
          <div className="form-group">
            <label className="mr-2">Category</label>
            <select
              className="mb-3"
              name="category"
              onChange={handleOnSelect}
              defaultValue={category}
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
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={handleOnChange}
                  autoFocus
                  required
                />
                <button className="btn btn-primary m-3" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
