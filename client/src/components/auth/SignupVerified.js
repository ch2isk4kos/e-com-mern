import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";

const SignupVerified = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
  }, []);

  useEffect(() => {
    if (user && user.token) history.push("/home");
  });

  const handleOnChange = (e) => {
    console.log("password", e.target.value);
    setPassword(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // valid email and pw
    if (!email || !password) {
      toast.error("Email and Passwowd required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    // authenticate user in firebase
    try {
      const firebaseAuthenticate = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (firebaseAuthenticate.user.emailVerified) {
        // remove user email from localStorage
        window.localStorage.removeItem("registrationEmail");
        // get user id - update pw - and get jwt
        let user = auth.currentUser;
        await user.updatePassword(password);
        // const id =
        await user.getIdTokenResult();
        // redux store

        // clear password input field
        setPassword(undefined);

        // redirect user
        history.push("/home");
      }
    } catch (err) {
      toast.error(err.message);
    }
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

export default SignupVerified;
