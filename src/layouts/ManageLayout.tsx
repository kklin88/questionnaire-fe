import React, { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";

import styles from "./ManageLayout.module.css";
import path from "path";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              新建問卷
            </Button>
            <Divider style={{ borderTop: "transparent" }} />
            <Button
              type={pathname.startsWith("/manage/list") ? "default" : "text"}
              size="large"
              icon={<BarsOutlined />}
              onClick={() => nav("/manage/list")}
            >
              我的問卷
            </Button>
            <Divider style={{ borderTop: "transparent" }} />
            <Button
              type={pathname.startsWith("/manage/star") ? "default" : "text"}
              size="large"
              icon={<StarOutlined />}
              onClick={() => nav("/manage/star")}
            >
              星標問卷
            </Button>
            <Divider style={{ borderTop: "transparent" }} />
            <Button
              type={pathname.startsWith("/manage/trash") ? "default" : "text"}
              size="large"
              icon={<DeleteOutlined />}
              onClick={() => nav("/manage/trash")}
            >
              回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
