import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import logo from "../../assets/yard-sale.jpg";

const { Meta } = Card;

const AdminProductCard = ({ product, handleOnDelete }) => {
  const { name, description, images, slug } = product;
  const img = images && images.length ? images[0].url : logo;
  const desc = description && description.substring(0, 50);

  return (
    <Card
      cover={
        <img
          className="p-1"
          src={img}
          alt={"product"}
          style={{ height: "300px" }}
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleOnDelete(slug)}
        />,
      ]}
    >
      <Meta title={name} description={`${desc}...`} />
    </Card>
  );
};

export default AdminProductCard;

// style={{ height: "300px", objectFit: "cover" }}
