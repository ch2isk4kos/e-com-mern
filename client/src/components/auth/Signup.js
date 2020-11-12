import React, { useState } from "react";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";

const REDIRECT_URL = process.env.REACT_APP_SIGNUP_REDIRECT_URL;

const Signup = () => {
  const [email, setEmail] = useState("");
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem("registrationEmail", email); // save email to localStorage
    toast.success(`Verification email sent to: ${email}`);
    setEmail("");
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3>Verify Email</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              className="form-control"
              type="email"
              placeholder="enter a valid email address"
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
