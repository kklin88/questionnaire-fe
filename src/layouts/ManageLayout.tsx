import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider, message } from "antd";
import {
  BarsOutlined,
  DeleteOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createQuestionService } from "../services/question";
import styles from "./ManageLayout.module.css";
import { useRequest } from "ahooks";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  // 在連續點擊時候設計loading 在loading的時候按鈕disable
  // const [loading,setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   console.log("Button clicked");
  //   const data = await createQuestionService();
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success("創建成功");
  //   } else {
  //     message.error("創建失敗");
  //   }
  //   setLoading(false)
  // }

  // 手動觸發 useRequest
  const { loading, run: handleCreateClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${result.id}`);
        message.success("創建成功");
      },
    },
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleCreateClick}
              disabled={loading}
            >
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
