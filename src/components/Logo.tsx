import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
const { Title } = Typography;
const Logo: FC = () => {
  return (
    <div>
      <Link to={LOGIN_PATHNAME}>
        <Space className={styles.container}>
          <Title>
            <FormOutlined />
          </Title>
          <Title>kk問卷</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
