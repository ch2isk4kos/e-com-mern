import React from "react";
import PaymentInformtion from "../user/PaymentInformation";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminOrders = ({ orders, handleOnOrderUpdate }) => {
  return (
    <>
      {orders.map((o) => (
        <div key={o._id} className="row pb-5">
          <PaymentInformtion order={o} />

          <div className="row">
            <div className="col-md-12">
              <p>
                <b>Update Status:</b>
              </p>

              <select
                onChange={(e) => handleOnOrderUpdate(o._id, e.target.value)}
              >
                <option value="Not Processed">Not Processed</option>
                <option value="Processing">Processing</option>
                <option value="Dispatch">Dispatch</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdminOrders;
