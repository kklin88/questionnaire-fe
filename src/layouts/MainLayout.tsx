import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";
import Logo from "../components/Logo";
import Userinfo from "../components/Userinfo";
import styles from "./MainLayout.module.css";
const { Header, Footer, Sider, Content } = Layout;
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Userinfo />
        </div>
      </Header>

      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        kk問卷 &copy;2024 -present. Created by kk
      </Footer>
    </Layout>
  );
};

export default MainLayout;
