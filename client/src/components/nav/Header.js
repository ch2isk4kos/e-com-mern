import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  BookOutlined,
  BuildOutlined,
  FireOutlined,
  LoginOutlined,
  SelectOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
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
      <Item key="thunderbolt" icon={<FireOutlined />}>
        <Link to={"/home"}>Yard Sale</Link>
      </Item>
      {/* Products */}
      <Item key="products" icon={<TagsOutlined />}>
        <Link to={"/products"}>Products</Link>
      </Item>
      {/* Login */}
      <Item key="login" icon={<LoginOutlined />}>
        <Link to={"/login"}>Login</Link>
      </Item>
      {/* Signup */}
      <Item key="signup" icon={<BuildOutlined />}>
        <Link to={"/signup"}>Sign Up</Link>
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
          <Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Item>
          <Item key="signout" icon={<SelectOutlined />}>
            Sign Out
          </Item>
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
          <Item key="checkout" icon={<WalletOutlined />}>
            Check Out
          </Item>
          <Item key="saved" icon={<BookOutlined />}>
            Saved Items
          </Item>
        </ItemGroup>
      </SubMenu>
    </Menu>
  );
};

export default Header;
