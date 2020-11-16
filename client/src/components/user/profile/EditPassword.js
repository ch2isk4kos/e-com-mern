import React, { useState } from "react";
import ProfileNav from "./ProfileNav";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { auth } from "../../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";

const EditPassword = ({ history }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const editPasswordForm = () => <form><</form>

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setIsLoading(false);
        setPassword("");
        toast.success("You've successfully updated your password.");
        history.push("/user/profile");
      })
      .catch((err) => {
        setIsLoading(true);
        toast.error(err.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <ProfileNav />
        </div>
        <div className="col">
          {isLoading ? (
            <h1 className="text-danger">Loading...</h1>
          ) : (
            <h1 className="text-primary">Edit Password</h1>
          )}
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <div className="col-md-6 offset-md-3">
                <input
                  className="form-control"
                  type="password"
                  placeholder="enter new password"
                  value={password}
                  disabled={isLoading}
                  onChange={handleOnChange}
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn btn-primary m-3"
                  disabled={!password || password.length < 6 || isLoading}
                >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
