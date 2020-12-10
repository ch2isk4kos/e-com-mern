import React from "react";

const ProductCheckoutCard = ({ product }) => {
  const { name, brand, color, price, shipping } = product;
  return (
    <tbody>
      <tr>
        <td>
          <span className="p-1">{brand}</span>
          <span>{name}</span>
          <br />
          <p>
            color: <span>{color}</span>
          </p>
        </td>
        <td>{product.count}</td>
        <td>{shipping}</td>
        <td>${price}</td>
      </tr>
    </tbody>
  );
};

export default ProductCheckoutCard;
