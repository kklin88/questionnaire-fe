import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
const QuestionLayout: FC = () => {
  // 加載用戶資料
  const { waitingUserData } = useLoadUserData();
  // 用戶沒有登陸時，導向登陸頁面
  useNavPage(waitingUserData);
  return (
    <div style={{ height: "100vh" }}>
      {waitingUserData ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
