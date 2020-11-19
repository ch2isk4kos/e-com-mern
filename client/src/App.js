import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/nav/Header";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import SignupVerified from "./components/auth/SignupVerified";
import Login from "./components/auth/Login";
import PasswordReset from "./components/auth/PasswordReset";
import UserRoute from "./components/routes/userRoute";
import AdminRoute from "./components/routes/adminRoute";
import History from "./components/user/History";
import Main from "./components/user/profile/Main";
import EditPassword from "./components/user/profile/EditPassword";
import Cart from "./components/user/Cart";
import Wishlist from "./components/user/Wishlist";
import AdminDashboard from "./components/admin/AdminDashboard";
import CreateCategory from "./components/admin/category/CreateCategory";
import UpdateCategory from "./components/admin/category/UpdateCategory";
// import CreateSubCategory from "./components/admin/category/sub/CreateSubCategory";
import { Switch, Route } from "react-router-dom";
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
  }, [dispatch]);
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
        {/* User Routes*/}
        <UserRoute exact path={"/user/history"} component={History} />
        <UserRoute exact path={"/user/cart"} component={Cart} />
        <UserRoute exact path={"/user/wishlist"} component={Wishlist} />
        <UserRoute exact path={"/user/profile"} component={Main} />
        <UserRoute
          exact
          path={"/user/edit-password"}
          component={EditPassword}
        />
        {/* Admin Routes */}
        <AdminRoute
          exact
          path={"/admin/dashboard"}
          component={AdminDashboard}
        />
        <AdminRoute exact path={"/admin/category"} component={CreateCategory} />
        <AdminRoute
          exact
          path={"/admin/category/:slug"}
          component={UpdateCategory}
        />
        {/* <AdminRoute exact path={"/admin/sub"} component={CreateSubCategory} /> */}
      </Switch>
    </div>
  );
};

export default App;
