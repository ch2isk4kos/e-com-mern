import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../api/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "antd";

const REDIRECT_URL = process.env.REACT_APP_PASSWORD_REDIRECT_URL;

const PasswordReseet = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/home");
  }, [user, history]);

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.info("Check your email address to reset password.");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <form>
        {loading ? (
          <h3 className="text-danger">Loading..</h3>
        ) : (
          <h3>Forgot Password?</h3>
        )}

        <input
          className="form-control"
          type="email"
          placeholder="enter a verified email"
          value={email}
          onChange={handleOnChange}
          autoFocus
        />
        {/* Google OAuth */}
        <Button
          className="mb-3"
          type="danger"
          onClick={handleOnSubmit}
          disabled={!email}
          block
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordReseet;
