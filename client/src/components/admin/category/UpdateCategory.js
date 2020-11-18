import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../api/nodejs/categories";
import AdminNav from "../AdminNav";
import { toast } from "react-toastify";

const UpdateCategory = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    updateCategory({ name }, user.token)
      .then((res) => {
        setIsLoading(false);
        setName("");
        toast.success(`${res.data.name} succressfully updated`);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400)
          toast.error("Update Category Error:", err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {isLoading ? <h1>Loading...</h1> : <h1>Update Category</h1>}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder={(e) => getCategory(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
