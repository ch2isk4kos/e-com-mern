import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminNav from "./AdminNav";
import AdminOrders from "./AdminOrders";
import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "../../api/nodejs/admin.js";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getAdminOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  const updateOrderStatus = (orderId, orderStatus) => {
    console.log("order id: ", orderId);
    console.log("order status: ", orderStatus);

    updateAdminOrderStatus(user.token, orderId, orderStatus)
      .then((res) => {
        console.log(res.data, null, 4);
        loadUserOrders();
        toast.success("Order status updated.");
      })
      .catch((err) => {
        toast.error(`Update failed: ${err}`);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col mt-3">
          <h1>All Orders</h1>
          {/* {JSON.stringify(orders)} */}
          <AdminOrders
            orders={orders}
            handleOnOrderUpdate={updateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
