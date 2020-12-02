import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import logo from "../../assets/yard-sale.jpg";

const { Meta } = Card;

const AdminProductCard = ({ product, handleOnDelete }) => {
  const { name, description, images, slug } = product;
  const src = images && images.length ? images[0].url : logo;
  const desc = description && description.substring(0, 50);

  return (
    <Card
      cover={
        <img
          className="p-1"
          src={src}
          alt={"product"}
          style={{ height: "300px" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
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
