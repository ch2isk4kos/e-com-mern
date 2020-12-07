import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Search from "../search/Search";
import firebase from "firebase/firebase";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  AuditOutlined,
  BookOutlined,
  BuildOutlined,
  FireOutlined,
  LoginOutlined,
  SearchOutlined,
  SelectOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

// ant design
const { SubMenu, Item, ItemGroup } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
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
      {/* User History */}
      {user && user.role === "subscriber" && (
        <Item key="login" icon={<AppstoreOutlined />}>
          <Link to={"/user/history"}>History</Link>
        </Item>
      )}
      {/* Login */}
      {!user && (
        <Item className="float-right" key="login" icon={<LoginOutlined />}>
          <Link to={"/login"}>Login</Link>
        </Item>
      )}
      {/* Signup */}
      {!user && (
        <Item className="float-right" key="signup" icon={<BuildOutlined />}>
          <Link to={"/signup"}>Sign Up</Link>
        </Item>
      )}
      {/* User Account */}
      {user && user.role === "subscriber" && (
        <SubMenu
          className="float-right"
          key="account"
          title="Account"
          icon={<UserOutlined />}
        >
          {/* Profile Sub Menu */}
          <ItemGroup title={user.email.split("@")[0]}>
            <Item key="profile" icon={<AuditOutlined />}>
              <Link to={"/user/profile"}>Profile</Link>
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
      )}
      {/* Admin Account */}
      {user && user.role === "admin" && (
        <SubMenu
          className="float-right"
          key="account"
          title="Admin"
          icon={<UserOutlined />}
        >
          {/* Profile Sub Menu */}
          <ItemGroup title={user.email.split("@")[0]}>
            <Item key="profile" icon={<AuditOutlined />}>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
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
      )}
      {/* Cart */}
      {user && (
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
      )}
      {/* Search Bar */}
      <Item className="float-right" key="search">
        <Search />
      </Item>
    </Menu>
  );
};

export default Header;
