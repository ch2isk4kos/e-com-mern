import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../../api/custom/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.totalAmount);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Address</h4>
        <br />
        textarea
        <button>Save</button>
        <br />
        <h4>Coupon</h4>
        coupon input and application
        <br />
        {JSON.stringify(products)}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        {/* {cart.map((c, i) => (
          <div key={i}>
            <p className="mt-3">
              {c.name} x {c.count} ${c.price * c.count}
            </p>
          </div>
        ))} */}
        <hr />
        {/* <h4>Total ${purchaseAmount()}</h4> */}
        {/* {user ? (
          <button className="btn btn-sm btn-primary mt-3">
            Proceed to Checkout
          </button>
        ) : (
          <button className="btn btn-sm btn-primary mt-3">
            <Link
              to={{ pathname: "login", state: { from: "cart" } }}
              // disable={!cart.length}
            >
              Login to Checkout
            </Link>
          </button>
        )} */}
        <div className="col-md-6">
          <div className="row">
            <button className="btn btn-sm btn-primary btn-block">
              Place Order
            </button>
            <button className="btn btn-sm btn-primary btn-block mt-3">
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
