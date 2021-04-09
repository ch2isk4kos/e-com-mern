import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../api/nodejs/coupons";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  //access user token from redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getCoupons().then((res) => {
      setCoupons(res.data);
    });
  }, []);

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
    setIsLoading(true);
    //console.log(name, expiry, discount);

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setIsLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`${res.data.name} coupon created successfully`);
      })
      .catch((err) => {
        console.log("create coupon", err);
      });
  };

  const removeCoupon = (id) => {};

  return (
    // <div className="container-fluid">
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          {isLoading ? <h4>Is Loading...</h4> : <h4>Coupon Code</h4>}
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
          <br></br>
          <h4>{coupons.length} Coupons</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Coupon</th>
                <th scope="col">Discount</th>
                <th scope="col">Expiration</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.discount}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => removeCoupon(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
