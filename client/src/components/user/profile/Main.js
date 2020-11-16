import React from "react";
import ProfileNav from "./ProfileNav";

const Main = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <ProfileNav />
        </div>
        <div className="col">
          <h1>User Profile</h1>
        </div>
      </div>
    </div>
  );
};

export default Main;
