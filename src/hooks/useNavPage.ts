import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (waitingUserData) return;
    if (username) {
      //已經登陸了，可以進入主頁面了
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }
    //尚未登陸，並且不需要用戶信息
    if (isNoNeedUserInfo(pathname)) return;
    else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}
export default useNavPage;
