import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserWishlist, updateUserWishlist } from "../../api/custom/user";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getUserWishlist(user.token).then((res) => {
      console.log(res.data, null, 4);
      // setWishlist(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <UserNav />
        </div>
        <div className="col-md-6">
          <h1>Wishlist</h1>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
