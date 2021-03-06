import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../api/firebase/firebaseConfig";
import { createOrUpdateUser } from "../../api/firebase/firebaseFunctions.js";
import { toast } from "react-toastify";

const SignupVerified = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("registrationEmail"));
  }, []);

  // useEffect(() => {
  //   if (user && user.token) history.push("/home");
  // }, [user, history]);

  // const handleOnChange = (e) => {
  //   console.log("password", e.target.value);
  //   setPassword(e.target.value);
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // validate email and pw
    if (!email || !password) {
      toast.error("Email and Password required");
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
        // get user
        let user = auth.currentUser;
        // update pw
        await user.updatePassword(password);
        // get user id from jwt
        const userId = await user.getIdTokenResult();
        const username = user.email.split("@")[0];

        console.log("USER:", user, "USER_ID:", userId);

        // call custom func. && dispatch payload to action creator (redux store)
        createOrUpdateUser(userId.token)
          .then((res) => {
            dispatch({
              type: "USER_LOGIN",
              payload: {
                name: res.data.name,
                email: res.data.email,
                picture: res.data.picture,
                token: userId.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) =>
            console.log(`SignUp Verified Authentication ${err.messsage}`)
          );
        // successful toast
        toast.success(`Welcome. Happy to Have You ${username}!`);
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
              // onChange={handleOnChange}
              onChange={(e) => setPassword(e.target.value)}
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
