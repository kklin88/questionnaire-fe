import React, { FC, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router/index";
import { useNavigate, Link } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { LOGIN_PATHNAME } from "../router/index";
const { Title } = Typography;
const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [pathname]);
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
