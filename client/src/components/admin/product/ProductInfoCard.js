import React from "react";
import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import logo from "../../../assets/yard-sale.jpg";
import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;

const ProductInfoCard = ({ product }) => {
  const { name, images } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((image) => (
              <img key={image.public_id} src={image.url} />
            ))}
          </Carousel>
        ) : (
          <Card className="card-image mb-3" cover={<img src={logo} />}></Card>
        )}
      </div>
      <div className="col-md-5">
        <h1 className="p-3" style={{ background: "WhiteSmoke" }}>
          {name}
        </h1>
        <Card
          actions={[
            <Link to={`/`}>
              <HeartOutlined className="text-warning" />
              <br />
              <p>Like</p>
            </Link>,
            <>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              <p>Add to Cart</p>
            </>,
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
