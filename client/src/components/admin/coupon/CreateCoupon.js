import React, { useState, useEffect } from "react";
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
  const { user } = useSelector((state) => ({ ...state }));
  const [coupon, setCoupon] = useState([]);

  useEffect(() => {}, []);

  const loadCoupons = async () => {
    const p = await getCoupons();
    return setCoupons(p.data);
  };

  const handleOnChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createCoupon(Coupon, user.token)
      .then((res) => {
        console.log(res.data);
        window.alert(`Confirm ${res.data.name} Create`);
        window.location.reload();
        toast.success(`${res.data.name} succressfully created`);
      })
      .catch((err) => {
        setIsLoading(true);
        if (err.response.status === 400) toast.error(err.response.data.errMsg);
      });
  };

  const handleOnDelete = async (slug) => {
    if (window.confirm("Are You Sure?")) {
      setIsLoading(true);
      removeCoupon(slug, user.token)
        .then((res) => {
          setIsLoading(false);
          loadProducts();
          toast.error(`${res.data.name} Deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setIsLoading(true);
            toast.error("DELETE ERROR:", err.response.data);
          }
        });
    }
  };

  return (
    <div className="container">
      <h4>Coupon ID</h4>
    </div>
  );
};

export default CreateCoupon;
