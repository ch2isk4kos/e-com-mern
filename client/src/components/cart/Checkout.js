import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyUserCart, userAddress } from "../../api/custom/user";
import { toast } from "react-toastify";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [isAddress, setIsAddress] = useState(false);

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

  const loadUserCart = () => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.totalAmount);
      })
      .catch((err) => console.log(err.message.errMsg));
  };

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

  const saveAddress = () => {
    userAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setIsAddress(true);
        toast.success("Address saved.");
      }
    });
  };

  return (
    <div className="row mt-5">
      {/* left side */}
      <div className="col-md-6">
        <h4>Address</h4>
        <br />
        <div className="container-fluid">
          <textarea
            className="form-control mb-2 pr-5"
            type="text"
            rows={5}
            // cols={3}
            value={address}
            onChange={handleOnAddress}
          />
        </div>
        <div className="container-fluid">
          {!isAddress ? (
            <button
              className="btn btn-sm btn-success btn-block mt-3"
              onClick={saveAddress}
            >
              Save
            </button>
          ) : (
            <button className="btn btn-sm btn-primary btn-block mt-3">
              Update
            </button>
          )}
        </div>
        <h4 className="mt-3">Coupon</h4>
        coupon input and application
        <br />
        {JSON.stringify(products)}
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
        <h4>Total: ${total}</h4>
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
