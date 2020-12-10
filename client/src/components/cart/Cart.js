import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const purchaseAmount = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>
          {/* <span className="float-left">{cart.length} Products</span> */}
          {cart.length} Items
        </h4>
      </div>
      <div className="row">
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
          <h4>Total ${purchaseAmount()}</h4>
          {user ? (
            <button className="btn btn-sm btn-primary mt-3">
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-3">
              Login to Checkout
            </button>
          )}
        </div>

        <div className="col-md-8">
          {!cart.length ? (
            <>
              <h4>
                No Products in Cart
                <Link to="/shop">
                  Continue Shopping
                  {/* <span className="float-left">Continue Shopping</span> */}
                </Link>
              </h4>
            </>
          ) : (
            <h4>Show Items in Cart</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
