import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import {
  ShoppingOutlined,
  UserAddOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Dashboard from "./Dashboard/Dashboard";
import Customer from "./CustomerManagement/Customer";
import Food from "./FoodManagement/Food";
import AddFoods from "./FoodManagement/AddFoods";

const { Content, Footer, Sider } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const params = new URLSearchParams(search);

  const queryCustomer = params.get("_optCustomer");
  const queryFood = params.get("_optFood");
  const queryAddFoods = params.get("_food");

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const { firstName, lastName, contactNo, address, email, id, type } =
    useParams();

  const logoutHandler = () => {
    localStorage.setItem("authToken", null);
    localStorage.removeItem("firstName", firstName);
    localStorage.removeItem("lastName", lastName);
    localStorage.removeItem("address", address);
    localStorage.removeItem("contactNo", contactNo);
    localStorage.removeItem("email", email);
    localStorage.removeItem("id", id);
    localStorage.removeItem("type", type);
    history("/");
    window.location.reload();
  };

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="270px"
      >
        <Menu
          style={{ marginTop: "150px" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={
            queryCustomer === "customer"
              ? ["1"]
              : queryFood === "food"
              ? ["2"]
              : ["0"]
          }
        >
          <Menu.Item
            key="0"
            icon={<HomeOutlined />}
            className="text-lg"
            onClick={() => {
              history(`/admin-dashboard/${localStorage.getItem("firstName")}`);
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<UserAddOutlined />}
            className="text-lg"
            onClick={() => {
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "firstName"
                )}?_optCustomer=customer`
              );
            }}
          >
            Customer Management
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<ShoppingOutlined />}
            className="text-lg"
            onClick={() => {
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "firstName"
                )}?_optFood=food`
              );
            }}
          >
            Food Management
          </Menu.Item>
        </Menu>
        {collapsed === false ? (
          <center className="admin_singout_btn">
            <Button icon={<LogoutOutlined />} onClick={() => logoutHandler()}>
              Sign Out
            </Button>
          </center>
        ) : (
          <center className="admin_singout_btn">
            <LogoutOutlined onClick={() => logoutHandler()} />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/admin-dashboard/${localStorage.getItem("firstName")}` &&
            !queryCustomer &&
            !queryFood &&
            !queryAddFoods && <Dashboard />}
          {queryCustomer === "customer" && <Customer />}
          {queryFood === "food" && <Food />}
          {queryAddFoods === "addFood" && <AddFoods />}
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
       
      </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Admin;
