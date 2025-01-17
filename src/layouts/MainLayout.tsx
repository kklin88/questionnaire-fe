import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Flex, Layout, Spin } from "antd";
import Logo from "../components/Logo";
import Userinfo from "../components/Userinfo";
import useLoadUserData from "../hooks/useLoadUserData";
import styles from "./MainLayout.module.css";
import useNavPage from "../hooks/useNavPage";
const { Header, Footer, Sider, Content } = Layout;
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
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
        {/* 等待的時候不顯示 不等待的時候顯示outlet */}
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>
        kk問卷 &copy;2024 -present. Created by kk
      </Footer>
    </Layout>
  );
};

export default MainLayout;
