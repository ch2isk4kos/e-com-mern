import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EditPassword = () => {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* {loading ? (
            <h3 className="text-danger">Logging In...</h3>
          ) : (
            <h3>Login.</h3>
          )} */}
          <form>
            <h3>Edit Password</h3>
            <input
              className="form-control"
              type="password"
              placeholder="enter new password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Edit</button>
            <br />
            <Link to="/password-reset">Forgot My Password</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
