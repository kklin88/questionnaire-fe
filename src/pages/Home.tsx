import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";
// import "../_mock/index";
// import axios from "axios";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();
  // useEffect開發環境下執行兩次
  // mock.js只能劫持XMLHttpRequest,不能劫持fetch
  // useEffect(() => {
  //   axios
  //     .get("/api/test")

  //     .then((data) => console.log("axios", data.data));
  // }, []);
  useEffect(() => {
    // 服務端http://localhost:3001/api/question 會發生跨域問題
    // 該前端項目採用Create-react-app腳手架 使用webpack作為打包工具 用devServer進行代理
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log("fetch data", data));
  }, []);
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
