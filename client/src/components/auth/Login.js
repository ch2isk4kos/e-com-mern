import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, googleOAuthProvider } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "antd";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const btnDisabled = !email || password.length < 6;
  const dispatch = useDispatch();
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
    setLoading(true);

    try {
      const login = await auth.signInWithEmailAndPassword(email, password);
      console.log("LOGIN:", login);
      const { user } = login;
      const username = user.email.split("@")[0];
      const id = await user.getIdTokenResult();
      dispatch({
        type: "USER_LOGIN",
        payload: {
          email: user.email,
          token: id.token,
        },
      });
      toast.info(`Welcome Back ${username}!`);
      history.push("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleOnGoogleOAuth = async (e) => {
    e.preventDefault();
    console.log("Signin with Google");
    const google = auth.signInWithPopup(googleOAuthProvider);
    google
      .then(async (login) => {
        const { user } = login;
        const id = await user.getIdTokenResult();
        dispatch({
          type: "USER_LOGIN",
          payload: {
            email: user.email,
            token: id.token,
          },
        });
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h3 className="text-danger">Logging In...</h3>
          ) : (
            <h3>Login.</h3>
          )}
          <form>
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
            {/* Local */}
            <Button
              className="mb-3"
              type="primary"
              disabled={btnDisabled}
              onClick={handleOnSubmit}
              block
            >
              Sign In
            </Button>
            {/* Google OAuth */}
            <Button
              className="mb-3"
              type="submit"
              onClick={handleOnGoogleOAuth}
              block
            >
              Sign In with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
