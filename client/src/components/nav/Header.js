import React, { useState } from "react";
import { Menu } from "antd";
import {
  LoginOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  ThunderboltTwoTone,
  UserOutlined,
} from "@ant-design/icons";

const { SubMenu, Item, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const handleOnClick = (e) => {
    setCurrent({ current: e.key });
  };

  return (
    <Menu onClick={handleOnClick} selectedKeys={[current]} mode="horizontal">
      {/* Brand */}
      <Item key="thunderbolt" icon={<ThunderboltTwoTone />}>
        Brand
      </Item>
      {/* Products */}
      <Item key="products" icon={<TagsOutlined />}>
        Products
      </Item>
      {/* Login */}
      <Item key="login" icon={<LoginOutlined />}>
        Login
      </Item>
      {/* Profile */}
      <SubMenu
        className="float-right"
        key="profile"
        icon={<UserOutlined />}
        title="Profile"
      >
        {/* Profile Sub Menu */}
        <ItemGroup title="Menu">
          <Item key="settings">Settings</Item>
          <Item key="signout">Sign Out</Item>
        </ItemGroup>
      </SubMenu>
      {/* Cart */}
      <SubMenu
        className="float-right"
        key="cart"
        icon={<ShoppingCartOutlined />}
        title="Cart"
      >
        {/* Cart Sub Menu */}
        <ItemGroup title="Menu">
          <Item key="checkout">Check Out</Item>
          <Item key="saved">Saved Items</Item>
        </ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Header;
