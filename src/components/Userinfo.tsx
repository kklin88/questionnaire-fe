import React, { FC } from "react";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { getUserInfoService } from "../services/user";
import { useRequest } from "ahooks";
import { UserOutlined } from "@ant-design/icons";
import { log } from "console";
import { useDispatch } from "react-redux";
import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { logoutReducer } from "../store/userReducer";
const Userinfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  // 對於登入的用戶顯示用戶信息
  // const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const { username, nickname } = useGetUserInfo();
  function logout() {
    dispatch(logoutReducer()); //登出 清空 redux user信息
    removeToken(); //清除token的存儲
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }
  // 若未登入顯示登入鏈接 退出不需要請求服務端
  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );
  const Login = <Link to={LOGIN_PATHNAME}>登入</Link>;
  return (
    <>
      <div>{username ? UserInfo : Login}</div>
    </>
  );
};
export default Userinfo;
