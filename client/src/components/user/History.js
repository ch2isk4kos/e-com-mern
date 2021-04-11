import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserNav from "./UserNav";
import { getUserOrders } from "../../api/custom/user.js";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-6">
          {orders.length ? <h1>User History</h1> : <h1>No Purchase History</h1>}
        </div>
      </div>
    </div>
  );
};

export default History;
