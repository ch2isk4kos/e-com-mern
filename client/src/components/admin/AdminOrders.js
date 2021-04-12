import React from "react";
import PaymentInformtion from "../user/PaymentInformation";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const AdminOrders = ({ orders, handleOnOrderUpdate }) => {
  const renderPaymentTable = (order) => (
    <table className="table table-bordered mt-2">
      <thead className="thead-light">
        <tr className="bg-dark text-white">
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody style={{ backgroundColor: "White" }}>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.name}</b>
            </td>
            <td>${p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.product.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined
                  style={{
                    color: "green",
                  }}
                />
              ) : (
                <CloseCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((o) => (
        <div key={o._id} className="row pb-4 m-3">
          <div style={{ backgroundColor: "WhiteSmoke" }}>
            <div className="row mt-3">
              <PaymentInformtion order={o} currentStatus={false} />
            </div>
            {renderPaymentTable(o)}
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
