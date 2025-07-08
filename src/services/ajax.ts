import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";

// 定義返回格式
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = {
  [key: string]: any;
};

const instance = axios.create({
  timeout: 10 * 1000,
});
// request 攔截：每次請求都帶上 token
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`; //JWT的固定格式
    return config;
  },
  (error) => Promise.reject(error),
);

// response攔截器：同一處理errno 和msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    // 錯誤提示
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data as any;
});
export default instance;
