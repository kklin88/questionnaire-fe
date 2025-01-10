import React, { FC } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { LOGIN_PATHNAME } from "../router";
import { registerService } from "../services/user";
import { useRequest } from "ahooks";
const { Title } = Typography;
const Register: FC = () => {
  const nav = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values; //解構
      await registerService(username, password, nickname);
    },
    {
      manual: true, //手動模式
      onSuccess() {
        message.success("註冊成功");
        nav(LOGIN_PATHNAME);
      },
    },
  );

  const onFinish = (values: any) => {
    console.log(values);
    run(values); //調用ajax
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>register</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
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
              label="確認密碼"
              name="confirm"
              dependencies={["password"]}
              // 依賴password ，password變化，會重新觸發驗證
              rules={[
                { required: true, message: "請輸入密碼" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(new Error("兩次密碼不一致"));
                    }
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="暱稱" name="nickname">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }} label="" name="">
              <Space>
                <Button type="primary" htmlType="submit">
                  註冊
                </Button>
                <Link to={LOGIN_PATHNAME}>已有帳戶，登錄</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
