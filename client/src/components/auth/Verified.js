import React, { useState, useEffect } from "react";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";

const Verified = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
  }, []);
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Sign Up.</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              className="form-control"
              type="email"
              value={email}
              disabled
            />
            <input
              className="form-control"
              type="password"
              placeholder="create password"
              value={password}
              onChange={handleOnChange}
              autoFocus
            />
            <button className="btn btn-raised" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verified;
