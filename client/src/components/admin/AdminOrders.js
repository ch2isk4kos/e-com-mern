import React from "react";
import PaymentInformtion from "../user/PaymentInformation";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminOrders = ({ orders, handleOnOrderUpdate }) => {
  return (
    <>
      {orders.map((o) => (
        <div key={o._id} className="row pb-4 m-3">
          <div style={{ backgroundColor: "WhiteSmoke" }}>
            <div className="row mt-3">
              <PaymentInformtion order={o} currentStatus={false} />
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <p>
                  <b>Update Status:</b>
                </p>

                <select
                  className="btn btn-sm bg-primary text-white"
                  defaultValue={o.orderStatus}
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
        </div>
      ))}
    </>
  );
};

export default AdminOrders;
