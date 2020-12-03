import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductInfo = ({ product }) => {
  const { name, description, images, slug } = product;
  return (
    <>
      <div className="col-md-7">Image Carousel</div>
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
