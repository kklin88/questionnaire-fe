import React, { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Typography,
  Space,
  Button,
  Checkbox,
  Form,
  Input,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router";
import { loginService } from "../services/user";
import { useRequest } from "ahooks";
import { setToken } from "../utils/user-token";

const { Title } = Typography;
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}
function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: FC = () => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);
  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = "" } = result;
        setToken(token); // 存儲token 到 localStorage
        message.success("登陸成功");
        nav(MANAGE_INDEX_PATHNAME); //導航到我的問卷
      },
    },
  );
  const onFinish = (values: any) => {
    console.log(values);
    const { username, password, remember } = values;
    run(username, password); //執行ajax
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用戶登錄</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="用戶名"
              name="username"
              rules={[
                { required: true, message: "請輸入用戶名" },
                {
                  type: "string",
                  min: 5,
                  max: 20,
                  message: "用戶名在 5-20 之間",
                },
                { pattern: /^\w+$/, message: "只能是數字字母下劃線" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密碼"
              name="password"
              rules={[{ required: true, message: "請輸入密碼" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
            >
              <Checkbox>記住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登入
                </Button>
                <Link to={REGISTER_PATHNAME}> 註冊新用戶</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
