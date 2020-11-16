import React from "react";
import { Link } from "react-router-dom";
import EditPassword from "./EditPassword";

const Main = () => {
  return (
    <div>
      <Link to={"/user/edit-password"}>Edit Password</Link>
    </div>
  );
};

export default Main;
