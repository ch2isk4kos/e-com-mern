import React from "react";
import UserNav from "./UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h1>User History</h1>
        </div>
      </div>
    </div>
  );
};

export default History;
