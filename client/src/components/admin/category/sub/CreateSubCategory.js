import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNav from "../../AdminNav";
import { toast } from "react-toastify";

const CreateSubCategory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {/* <form onSubmit={handleOnSubmit}> */}
          <h1>Create Sub Category</h1>
          <form>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="enter new sub category"
                  // value={name}
                  // onChange={handleOnChange}
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
              // placeholder={`search category: ${categories.length}`}
              // value={query}
              // onChange={handleOnSearch}
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
                  <Link className="btn btn-sm btn-primary mr-1 float-right">
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
