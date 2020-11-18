import React from "react";
import AdminNav from "../AdminNav";

const CreateCategory = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Create Category</h1>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
