import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  AuditOutlined,
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
import firebase from "firebase/firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// ant design
const { SubMenu, Item, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOnClick = (e) => {
    setCurrent({ current: e.key });
  };
  const handleOnSignOut = () => {
    firebase.auth().signOut();
    // update store
    dispatch({
      type: "USER_SIGNOUT",
      payload: null,
    });
    history.push("/");
  };

  return (
    <Menu onClick={handleOnClick} selectedKeys={[current]} mode="horizontal">
      {/* Brand */}
      <Item key="thunderbolt" icon={<FireOutlined />}>
        <Link to={"/home"}>Yard Sale</Link>
      </Item>
      {/* Categories */}
      <Item key="categories" icon={<AppstoreOutlined />}>
        <Link to={"/categories"}>Categories</Link>
      </Item>
      {/* Products */}
      <Item key="products" icon={<TagsOutlined />}>
        <Link to={"/products"}>New Products</Link>
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
        key="account"
        icon={<UserOutlined />}
        title="Account"
      >
        {/* Profile Sub Menu */}
        <ItemGroup title="Menu">
          <Item key="profile" icon={<AuditOutlined />}>
            Profile
          </Item>
          <Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Item>
          <Item
            key="signout"
            icon={<SelectOutlined />}
            onClick={handleOnSignOut}
          >
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
