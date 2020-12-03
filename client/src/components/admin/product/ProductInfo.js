import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;

const ProductInfo = ({ product }) => {
  const { name, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((image) => (
              <img key={image.public_id} src={image.url} />
            ))}
        </Carousel>
      </div>
      <div className="col-md-5">
        <Card
          actions={[
            <Link to={`/product/${slug}`}>
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
          <Meta title={name} description={description}></Meta>
        </Card>
      </div>
      <div className="col-md-7"></div>
    </>
  );
};

export default ProductInfo;
