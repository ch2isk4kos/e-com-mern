import React from "react";
import { Link } from "react-router-dom";
import { averageRating } from "../../../api/custom/ratings";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../../../assets/yard-sale.jpg";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { name, description, images, slug } = product;
  const src = images && images.length ? images[0].url : logo;
  const desc = description && description.substring(0, 50);

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
            <ShoppingCartOutlined className="text-danger" />
            <br />
            <p>Add to Cart</p>
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
