import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../../api/custom/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserCart();
    // getUserCart(user.token)
    //   .then((res) => {
    //     setProducts(res.data.products);
    //     setTotal(res.data.totalAmount);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const loadUserCart = () => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.totalAmount);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row mt-5">
      {/* left side */}
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
      {/* right side */}
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <h4>{`Items (${products.length})`}</h4>
        {products.map((p, i) => (
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
            <button className="btn btn-sm btn-primary">Place Order</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-sm btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
