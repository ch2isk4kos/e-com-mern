import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "./AdminNav";
import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "../../api/nodejs/admin.js";
import { toast, toastify } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getAdminOrders(user.token)
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
        loadUserOrders();
        toast.success("Order status updated.");
      })
      .catch((err) => {
        toast.error(`Update failed: ${err}`);
      });
  };

  const updateOrderStatus = (orderId, orderStatus) => {
    console.log("order id: ", orderId);
    console.log("order status: ", orderStatus);

    updateAdminOrderStatus(orderId, orderStatus).then((res) => {
      console.log(res.data, null, 4);
      setOrders(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Admin Dashboard</h1>
          {JSON.stringify(orders)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
