import React, { useEffect } from "react";
import Header from "./components/nav/Header";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import SignupVerified from "./components/auth/SignupVerified";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import History from "./components/user/History";
import UserRoute from "./components/routes/userRoute";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "./api/firebase/firebaseConfig";
import { currentUser } from "./api/firebase/firebaseFunctions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // check firebase auth state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = await user.getIdTokenResult();

        // dispatch to userReducer
        currentUser(userId.token)
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
          .catch((err) => console.log(`App Authentication ${err.messsage}`));
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
        {/* Custom */}
        <UserRoute>
          <Route exact path={"/user/history"} component={History} />
        </UserRoute>
      </Switch>
    </div>
  );
};

export default App;
