import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { name, description, images } = product;
  const image = images && images.length ? images[0].url : "";

  return (
    <Card
      cover={
        <img
          className="m-2 p-3"
          src={image}
          alt={"product image"}
          style={{ height: "300px", width: "auto", objectFit: "cover" }}
        />
      }
    >
      <Meta name={name} description={description} />
    </Card>
  );
};

export default AdminProductCard;
