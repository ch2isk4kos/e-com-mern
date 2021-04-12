import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserNav from "./UserNav";
import PaymentInformation from "./PaymentInformation";
import { getUserOrders } from "../../api/custom/user.js";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from "@react-pdf/renderer";

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

  const renderOrders = () => {
    return orders.map((o, i) => (
      <div key={i} className="m-5 p-3 card">
        {/* <h4>Payment Information</h4> */}
        <PaymentInformation order={o} />
        <br />
        {renderPaymentTable(o)}
        <div className="row">
          <div className="col">{renderPDFDownload()}</div>
        </div>
      </div>
    ));
  };

  const renderPaymentTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr className="bg-primary text-white">
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
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

  const renderPDFDownload = () => (
    <PDFDownloadLink
      className="btn btn-sm btn-block btn-outline-primary "
      document={
        <Document>
          <Page size="A4">
            <View>
              <Text>Section #1</Text>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      }
    >
      PDF Download
    </PDFDownloadLink>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <UserNav />
        </div>
        <div className="col-md-6">
          {orders.length ? <h2>User History</h2> : <h2>No Purchase History</h2>}
          {renderOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
