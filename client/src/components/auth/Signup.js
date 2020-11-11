import React, { useState } from "react";
import { auth } from "../../api/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Signup.</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              className="form-control"
              type="email"
              placeholder="email"
              value={email}
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

export default Signup;
