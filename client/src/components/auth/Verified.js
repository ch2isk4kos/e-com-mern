import React, { useState, useEffect } from "react";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";

const Verified = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
    // console.log(window.localStorage.getItem("registrationEmail"));
    // console.log(window.location.href);
  }, []);
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
        const idToken = await user.getIdTokenResult();
        // redux store

        // redirect user
        history.push("/home");
        // clear password input field
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

export default Verified;
