import React, { FC } from "react";
import { Button, Typography, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import styles from "./EditHeader.module.scss";
const { Title } = Typography;
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1); //返回上一页
              }}
            ></Button>
            <Title>問卷標題</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>

        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">發布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default EditHeader;
