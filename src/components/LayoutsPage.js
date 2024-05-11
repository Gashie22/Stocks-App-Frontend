//this is the default layout for all the pages
//use antd UI
import { thunk } from "redux-thunk";
import React, { useEffect, useState } from "react";
import "../Styles/Layout.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
// import { rootReducer } from "../redux/rootReducer";
// import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const LayoutsPage = ({ children }) => {
  const { cartItems , loading } = useSelector((state) => state.rootReducer);

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  //cart update + useEffect and get localstorage data
    const dispatch = useDispatch()

    useEffect(()=>{
      localStorage.setItem("cartItems",JSON.stringify(cartItems))
    },[cartItems])
//Cart page
const navigate = useNavigate()
  return (
    <Layout>
        {
            loading && <Spinner/>

        }
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-white text-sm ">
            ELMALA
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link style={{ textDecoration: 'none' }} to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link style={{ textDecoration: 'none' }} to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link style={{ textDecoration: 'none' }} to="/products">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link style={{ textDecoration: 'none' }} to="/customers">Cutomers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}  onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div className="cart-items d-flex" onClick={()=>navigate("/sales")}>
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutsPage;
