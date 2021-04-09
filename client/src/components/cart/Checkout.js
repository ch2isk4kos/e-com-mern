import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  userAddress,
  applyCoupon,
} from "../../api/custom/user";
import { toast } from "react-toastify";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [isAddress, setIsAddress] = useState(false);
  const [coupon, setCoupon] = useState("");
  //discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // loadUserCart();
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.totalAmount);
      })
      .catch((err) => console.log(err.message.errMsg));
  }, []);

  // const loadUserCart = () => {
  //   getUserCart(user.token)
  //     .then((res) => {
  //       setProducts(res.data.products);
  //       setTotal(res.data.totalAmount);
  //     })
  //     .catch((err) => console.log(err.message.errMsg));
  // };

  const handleOnEmptyCart = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Your cart is empty.");
      history.push("/home");
    });
  };

  const handleOnAddress = (e) => {
    console.log(e.target.value);
    setAddress(e.target.value);
  };

  const handleOnCoupon = (e) => {
    console.log(e.target.value);
    setCoupon(e.target.value);
    setDiscountError("");
  };

  const saveAddress = () => {
    userAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        // setAddress();
        setIsAddress(true);
        console.log(user);
        console.log(address);
        toast.success(`Address Saved: ${address}`);
      }
    });
  };

  const applyCouponToUserCart = () => {
    console.log(`Sending Coupon: ${coupon} to server`);

    // apply coupon
    applyCoupon(user.token, coupon).then((res) => {
      console.log("response from coupon applied: ", res.data);

      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux with applied coupon
        setCoupon("");
      }

      if (res.data.errMsg) {
        setDiscountError(res.data.errMsg);
        //update redux with applied coupon
        setDiscountError("");
      }
    });
  };

  // const showAddress = () => {};x

  // const showProductSummary = () => {};

  // const showApplyCoupon = () => {};

  return (
    <div className="row mt-5">
      {/* left side */}
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <div className="container-fluid">
          <input
            className="form-control mb-2 pr-5"
            type="text"
            value={address}
            onChange={handleOnAddress}
          />

          {!isAddress ? (
            <button
              className="btn btn-sm btn-success mt-3"
              onClick={saveAddress}
            >
              Save
            </button>
          ) : (
            <button
              // className="btn btn-sm btn-primary btn-block mt-3"
              className="btn btn-sm btn-primary mt-3"
              onClick={saveAddress}
            >
              Update
            </button>
          )}
        </div>
        <br />
        <h4 className="mt-3">Coupon Code</h4>
        <div className="container-fluid">
          {discountError && toast.error(`${discountError}`)}
          <input
            className="form-control mb-2 pr-5"
            type="text"
            value={coupon}
            onChange={handleOnCoupon}
          />
          <button
            className="btn btn-sm btn-success mt-3"
            onClick={applyCouponToUserCart}
          >
            Apply
          </button>
        </div>
        <br />
      </div>
      {/* right side */}
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <h4>{`Items (${products.length})`}</h4>
        {products.length > 0 &&
          products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.name} x {p.count} = ${p.product.price * p.count}
              </p>
            </div>
          ))}
        <hr />
        {totalAfterDiscount > 0 ? (
          <h4>Total: ${totalAfterDiscount}</h4>
        ) : (
          <h4>Total: ${total}</h4>
        )}

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-sm btn-primary"
              disabled={!isAddress || !products.length}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-sm btn-danger"
              disabled={!products.length}
              onClick={(e) => handleOnEmptyCart(e)}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
