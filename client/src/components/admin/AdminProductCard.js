import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { name, description, images } = product;

  return (
    <Card cover={<img src={images && images.length ? images[0].url : ""} />}>
      <Meta name={name} description={description} />
    </Card>
  );
};

export default AdminProductCard;
