import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleOAuthProvider } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

const NODE_API = process.env.REACT_APP_NODE_API_URL;

const createOrUpdateUser = async (token) => {
  return await axios.post(
    `${NODE_API}/create-or-update-user`,
    {},
    {
      headers: {
        auth: token,
      },
    }
  );
};

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const btnDisabled = !email || password.length < 6;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  // const handleOnChange = (e) => {
  //   console.log(e.target.value);
  //   setEmail(e.target.value);
  // };
  // const enterLoading = (index) => {
  //   const load = [...loadings];
  //   load[index] = true;
  //   setLoadings(load);
  // };

  useEffect(() => {
    if (user && user.token) history.push("/home");
    setEmail("");
    setPassword("");
  }, [user, history]);

  // INTERNAL LOGIN FORM SUBMISSION
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.table("EMAIL:", email, "PASS:", password);
    setLoading(true);

    try {
      const login = await auth.signInWithEmailAndPassword(email, password);
      console.log("LOGIN:", login);
      const { user } = login;
      const userId = await user.getIdTokenResult();
      const username = user.email.split("@")[0];

      createOrUpdateUser(userId.token)
        .then((res) => {
          console.log(`And then a response: ${res}`);

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
        .catch((err) => console.log(`Authenticatoin Error: ${err.messsage}`));

      toast.info(`Welcome Back ${username}!`);
      history.push("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  // GOOGLE OAUTH
  const handleOnGoogleOAuth = async (e) => {
    e.preventDefault();
    const google = auth.signInWithPopup(googleOAuthProvider);
    google
      .then(async (login) => {
        const { user } = login;
        const userId = await user.getIdTokenResult();
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
          .catch((err) => console.log(`Authenticatoin Error: ${err.messsage}`));
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
            <Link to="/password-reset">Forgot My Password</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
