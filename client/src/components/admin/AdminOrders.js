import React from "react";
import PaymentInformtion from "../user/PaymentInformation";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminOrders = ({ orders, handleOnOrderUpdate }) => {
  return (
    <>
      {orders.map((o) => (
        <div key={o._id} className="row pb-5">
          <PaymentInformtion order={o} />
        </div>
      ))}
    </>
  );
};

export default AdminOrders;
