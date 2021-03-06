import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isModal, setIsModal] = useState(false);
  let history = useHistory();
  let params = useParams();

  const handleOnRating = () => {
    if (user && user.token) {
      setIsModal(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${params.slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleOnRating}>
        <StarOutlined className="text-warning" />
        <br />
        {user ? "Rate Product" : "Login to Rate"}
      </div>
      <>
        <Modal
          title={`Rate Product`}
          centered
          visible={isModal}
          onOk={() => {
            setIsModal(false);
            toast.success("Thanks for the review!");
          }}
          onCancel={() => setIsModal(false)}
        >
          {children}
        </Modal>
      </>
    </>
  );
};

export default RatingModal;
