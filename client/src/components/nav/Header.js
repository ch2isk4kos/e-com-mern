import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState(null);

  const handleOnClick = () => {};

  return (
    <Menu onClick={handleOnClick} selectedKeys={[current]} mode="horizontal">
      {/* Mail */}
      <Menu.Item key="mail" icon={<MailOutlined />}>
        MERN
      </Menu.Item>
      {/* Store */}
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>
      {/* Sub Menu */}
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Cart">
        {/* Sub Menu Item 1 */}
        <Menu.ItemGroup title="Checkout">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        {/* Sub Menu Item 2 */}
        <Menu.ItemGroup title="Something Else">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
