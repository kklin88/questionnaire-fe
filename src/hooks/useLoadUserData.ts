import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { loginReducer } from "../store/userReducer";
function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true); //等待用戶信息
  //ajax加載用戶信息
  const { run } = useRequest(getUserInfoService, {
    manual: true, //手動模式，不自動發送請求
    onSuccess: (result) => {
      const { username, nickname } = result;
      //存儲到redux store中
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false); //用戶信息已經獲取，不用等待
    },
  });

  //判斷當前redux store中是否有用戶信息
  const { username } = useGetUserInfo(); //如果已經獲取用戶信息redux store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); //用戶信息已經獲取，不用等待
      return;
    }
    run(); //如果尚未獲取用戶信息redux store，則開始ajax加載用戶信息
  }, [username]);

  // ajax加載完用戶信息後，放入redux中，不用等待ajax回傳
  return { waitingUserData };
}
export default useLoadUserData;
