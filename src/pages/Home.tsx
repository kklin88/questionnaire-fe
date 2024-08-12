import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    // 第三方hook
    // nav('/login?b=10')
    nav({ pathname: "/login", search: "b=21" });
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>問卷調查 ｜ 在線投票</Title>
        <Paragraph>已累積創建問卷100份，發布問卷90份，受到問卷980份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            開始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
