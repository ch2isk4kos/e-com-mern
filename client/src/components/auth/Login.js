import React, { useState } from "react";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const btnDisabled = !email || password.length < 6;
  // const [loadings, setLoadings] = useState([]);
  // const handleOnChange = (e) => {
  //   console.log(e.target.value);
  //   setEmail(e.target.value);
  // };
  // const enterLoading = (index) => {
  //   const load = [...loadings];
  //   load[index] = true;
  //   setLoadings(load);
  // };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.table("EMAIL:", email, "PASS:", password);
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Login.</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              className="form-control"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="mb-3"
              type="primary"
              disabled={btnDisabled}
              block
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
