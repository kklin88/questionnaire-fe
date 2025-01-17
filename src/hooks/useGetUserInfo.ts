import { useSafeState } from "ahooks";
import { useSelector } from "react-redux";
import { Statetype } from "../store";
import { UserStateType } from "../store/userReducer";
function useGetUserInfo() {
  const { username, nickname } = useSelector<Statetype>(
    (state) => state.user,
  ) as UserStateType;
  return { username, nickname };
}
export default useGetUserInfo;
