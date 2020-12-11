import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer, Button } from "antd";

const CartDrawer = ({ children }) => {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <div>
      <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>
    </div>
  );
};

export default CartDrawer;
