import React from "react";
import { Card } from "antd";
// import logo from "../../assets/";
import logo from "../../assets/yard-sale.jpg";

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { name, description, images } = product;
  const image = images && images.length ? images[0].url : logo;

  return (
    <Card
      cover={
        <img
          className="p-1"
          src={image}
          alt={"product"}
          style={{ height: "300px" }}
        />
      }
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

export default AdminProductCard;

// style={{ height: "300px", objectFit: "cover" }}
