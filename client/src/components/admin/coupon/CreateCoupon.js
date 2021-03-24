import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getCoupons,
//   createCoupon,
//   removeCoupon,
// } from "../../../api/nodejs/coupons";
// import { toast } from "react-toastify";
// import { DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");

  //   const handleOnChange = (e) => {
  //     console.log({ [e.target.name]: e.target.value });
  //     switch (e.target.name) {
  //       case e.target.name === "name":
  //         setName({ [e.target.name]: e.target.value });
  //         break;
  //       case e.target.name === "discount":
  //         setExpiry({ [e.target.name]: e.target.value });
  //         break;
  //     }
  //   };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Coupon Has Been Submitted!");
  };

  return (
    // <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          <h4>Coupon Code</h4>
          <form onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount</label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiration Date</label>
              <br></br>
              <DatePicker
                className="form-control"
                selected={expiry}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <br></br>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
