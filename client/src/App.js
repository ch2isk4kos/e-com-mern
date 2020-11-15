import React, { useEffect } from "react";
import Header from "./components/nav/Header";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import SignupVerified from "./components/auth/SignupVerified";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { auth } from "./api/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // check firebase auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = await user.getIdTokenResult();
        console.log("user:", user);
        // dispatch to userReducer
        dispatch({
          type: "USER_LOGIN",
          payload: {
            email: user.email,
            token: userId.token,
          },
        });
      }
    });
    return () => unsubscribe();
  });
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path={"/"} component={Landing} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/signup"} component={Signup} />
        <Route exact path={"/signup/verified"} component={SignupVerified} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/password-reset"} component={PasswordReset} />
      </Switch>
    </div>
  );
};

export default App;
