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
    loadUserWishlist();
  }, []);

  const loadUserWishlist = () => {
    getUserWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });
  };

  const handleOnUserWishlistUpdate = (productId) => {
    updateUserWishlist(user.token, productId).then((res) => {
      loadUserWishlist();
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
          {wishlist.map((product) => (
            <div key={product._id} className="alert alert-primary">
              <Link to={`/product/${product.slug}`}>
                <b>{product.name}</b>
              </Link>
              <span
                className="btn btn-sm btn-danger float-right m-6"
                onClick={() => handleOnUserWishlistUpdate(product._id)}
              >
                Remove
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
