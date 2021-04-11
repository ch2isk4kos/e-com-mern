import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { averageRating } from "../../../api/custom/ratings";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../../../assets/yard-sale.jpg";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { name, description, images, slug } = product;

  const { user, cart } = useSelector((state) => ({ ...state }));
  const [tooltip, setTooltip] = useState("Click to Add");
  const dispatch = useDispatch();

  const src = images && images.length ? images[0].url : logo;
  const desc = description && description.substring(0, 50);

  const handleOnAddToCart = () => {
    // create cart array
    let cart = [];

    if (typeof window !== "undefined") {
      // get data from local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push product(s) to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates with lodash
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      // display ant design tooltip
      setTooltip("Added");
      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
    //
    console.log("");
  };

  return (
    <div>
      <Card
        cover={
          <img
            className=""
            src={src}
            alt={"product"}
            style={{ height: "300px" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br />
            <p>View Product</p>
          </Link>,
          <>
            <Tooltip title={tooltip}>
              <a onClick={handleOnAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                {product.quantity < 1 ? (
                  <p>Out of Stock</p>
                ) : (
                  <p>Add to Cart</p>
                )}
              </a>
            </Tooltip>
          </>,
        ]}
      >
        <Meta title={name} description={`${desc}...`} />
        <div className="mt-3">
          {product && product.ratings && product.ratings.length > 0
            ? averageRating(product)
            : "No Rating"}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
