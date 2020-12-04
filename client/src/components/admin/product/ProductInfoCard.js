import React from "react";
import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import RatingModal from "./RatingModal";
import { averageRating } from "../../../api/custom/ratings";
import logo from "../../../assets/yard-sale.jpg";
import StarRating from "react-star-ratings";
import { Card, Tabs } from "antd";
import {
  HeartOutlined,
  StarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// const { Meta } = Card;
const { TabPane } = Tabs;

const ProductInfoCard = ({ product, rating, handleOnRatingSelection }) => {
  const { _id, name, images, description } = product;
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
          : "No ratings"}
        <Card
          actions={[
            <Link to={`/`}>
              <HeartOutlined className="text-warning" />
              <br />
              <p>Add to Wishlist</p>
            </Link>,
            <>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              <p>Add to Cart</p>
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
