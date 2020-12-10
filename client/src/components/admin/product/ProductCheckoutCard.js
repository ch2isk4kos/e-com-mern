import React from "react";
import { useDispatch } from "react-redux";
// import logo from "../../../assets/yard-sale.jpg";

const ProductCheckoutCard = ({ product }) => {
  const { images, name, brand, color, price, shipping } = product;

  const colors = [
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
          {colors}
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
        </td>
        <td>{product.count}</td>
        <td>{shipping}</td>
        <td>${price}</td>
      </tr>
    </tbody>
  );
};

export default ProductCheckoutCard;
