import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import RatingModal from "./RatingModal";
import { averageRating } from "../../../api/custom/ratings";
import logo from "../../../assets/yard-sale.jpg";
import StarRating from "react-star-ratings";
import { Card, Tabs, Tooltip } from "antd";
import {
  HeartOutlined,
  StarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import _ from "lodash";

// const { Meta } = Card;
const { TabPane } = Tabs;

const ProductInfoCard = ({ product, rating, handleOnRatingSelection }) => {
  const { _id, name, images, description } = product;

  const { user, cart } = useSelector((state) => ({ ...state }));
  const [tooltip, setTooltip] = useState("Click to Add");
  const dispatch = useDispatch();

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
    <>
      <div className="col-md-7">
        <>
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images.map((image) => (
                <img key={image.public_id} src={image.url} />
              ))}
            </Carousel>
          ) : (
            <Card className="card-image mb-3" cover={<img src={logo} />}></Card>
          )}
        </>
        <>
          <Tabs type="card">
            <TabPane key="1" tab="Description">
              {description}
            </TabPane>
            <TabPane key="2" tab="Comments">
              Leave a Comment
            </TabPane>
          </Tabs>
        </>
      </div>
      <div className="col-md-5">
        <h1 className="p-3" style={{ background: "WhiteSmoke" }}>
          {name}
        </h1>
        {product && product.ratings && product.ratings.length > 0
          ? averageRating(product)
          : "No Rating"}
        <Card
          actions={[
            <Link to={`/user/wishlist`}>
              <HeartOutlined className="text-warning" />
              <br />
              <p>Add to Wishlist</p>
            </Link>,
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleOnAddToCart}>
                  <ShoppingCartOutlined className="text-danger" />
                  <br />
                  <p>Add to Cart</p>
                </a>
              </Tooltip>
            </>,
            <RatingModal>
              <StarRating
                numberOfStars={5}
                starRatedColor="orange"
                isSelectable={true}
                name={_id}
                rating={rating}
                changeRating={handleOnRatingSelection}
              />
            </RatingModal>,
          ]}
        >
          <ProductInfo product={product} />
        </Card>
      </div>
      <div className="col-md-7"></div>
    </>
  );
};

export default ProductInfoCard;
