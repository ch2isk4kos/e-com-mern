import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// import logo from "../../../assets/yard-sale.jpg";

const ProductCheckoutCard = ({ product }) => {
  const { images, name, brand, color, price, shipping, quantity } = product;

  const colors = [
    "Charcoal",
    "Midnight",
    "Navy",
    "Forest Green",
    "Grey",
    "Crimson",
    "Dandilion",
  ];

  const dispatch = useDispatch();

  const handleOnColorChange = (e) => {
    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].color = e.target.value;
        }
        // return cart;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleOnQtyChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > quantity) {
      toast.error(`Only ${quantity} left.`);
      return;
    }

    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
        return cart;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleOnRemove = () => {
    let cart = [];

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1);
        }
        return cart;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <span className="p-1">{brand}</span>
          <span>{name}</span>
        </td>
        <td>
          <select
            className="form-control"
            name="color"
            onChange={handleOnColorChange}
          >
            {color ? <option>{color}</option> : <option>Select</option>}
            {colors &&
              colors.length > 0 &&
              colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
          {/* {color} */}
        </td>
        {/* <td>{product.count}</td> */}
        <td>
          <input
            className="form-control"
            type="number"
            value={product.count}
            onChange={handleOnQtyChange}
          />
        </td>
        <td>
          {shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>${price}</td>
        <td>
          <CloseOutlined
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleOnRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCheckoutCard;
