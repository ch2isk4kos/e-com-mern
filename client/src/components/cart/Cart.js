import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProductCheckoutCard from "../admin/product/ProductCheckoutCard";
import { userCheckout } from "../../api/custom/user";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

  const purchaseAmount = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const confirmOrder = () => {
    userCheckout(cart, user.token)
      .then((res) => {
        console.log("order response:", res);
        if (res.data.ok) history.push("/user/checkout");
      })
      .catch((err) => console.log("Order Error", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h4 className="mt-5">
          {/* <span className="float-left">{cart.length} Products</span> */}
          {cart.length} Items in Cart
        </h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <>
              <h4>
                No Products in Cart{" "}
                <Link to="/shop">
                  Continue Shopping
                  {/* <span className="float-left">Continue Shopping</span> */}
                </Link>
              </h4>
            </>
          ) : (
            <>
              <table className="table table-bordered">
                {/* Table Heading */}
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Color</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Shipping</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                {cart.map((p) => (
                  <ProductCheckoutCard key={p._id} product={p} />
                ))}
              </table>
            </>
          )}
        </div>
        <div className="col-md-4">
          <h4>
            Order Summary
            {/* <span className="float-left">Order Summary</span> */}
          </h4>
          <hr />
          {cart.map((c, i) => (
            <div key={i}>
              <p className="mt-3">
                {c.name} x {c.count} ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <h4>Total ${purchaseAmount()}</h4>
          {user ? (
            <Link to={"/user/checkout"}>
              <button className="btn btn-sm btn-primary mt-3">
                Proceed To Checkout
              </button>
            </Link>
          ) : (
            <button className="btn btn-sm btn-primary mt-3">
              <Link
                to={{ pathname: "login", state: { from: "cart" } }}
                // disable={!cart.length}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
