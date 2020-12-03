import React from "react";
import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const {
    price,
    brand,
    color,
    shipping,
    quantity,
    purchased,
    category,
    subcategories,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <span className="float-left">Price</span>
        <span className="label label-default label-pill pull-xs-right">
          <span className="float-right">${price}</span>
        </span>
      </li>
      <li className="list-group-item">
        <span className="float-left">Brand</span>
        <span className="label label-default label-pill pull-xs-right">
          <span className="float-right">{brand}</span>
        </span>
      </li>
      <li className="list-group-item">
        <span className="float-left">Color</span>
        <span className="label label-default label-pill pull-xs-right">
          <span className="float-right">{color}</span>
        </span>
      </li>
      <li className="list-group-item">
        <span className="float-left">Shipping</span>
        <span className="label label-default label-pill pull-xs-right">
          <span className="float-right">{shipping}</span>
        </span>
      </li>
      <li className="list-group-item">
        <span className="float-left">In Stock</span>
        <span className="label label-default label-pill pull-xs-right">
          <span className="float-right">{quantity}</span>
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          <span className="float-left">Category</span>
          <Link
            to={`/cateogory/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            <span className="float-right">{category.name}</span>
          </Link>
        </li>
      )}
      {subcategories && (
        <li className="list-group-item">
          <span className="float-left">Sub Categories</span>
          {subcategories.map((sub) => (
            <Link
              to={`/sub/${sub.slug}`}
              key={sub._id}
              className="label label-default label-pill pull-xs-right"
            >
              <span className="float-right">{sub.name}</span>
            </Link>
          ))}
        </li>
      )}
    </ul>
  );
};

export default ProductInfo;
