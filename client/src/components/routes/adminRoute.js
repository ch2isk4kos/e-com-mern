import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentAdmin } from "../../api/firebase/firebaseFunctions.js";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          if (res) {
            console.log("CURRENT ADMIN: ", res);
            setOk(true);
          }
        })
        .catch((err) => {
          console.log("CURRENT ADMIN:", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Route {...rest} />
  ) : (
    <h1 className="text-danger">insert modal</h1>
  );
};

export default AdminRoute;
