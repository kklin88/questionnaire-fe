import React, { FC } from "react";
import { Typography, Space, Button, Checkbox, Form, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { LOGIN_PATHNAME } from "../router";
const { Title } = Typography;
const Register: FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
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
            <Form.Item label="用戶名" name="username">
              <Input />
            </Form.Item>

            <Form.Item label="密碼" name="password">
              <Input.Password />
            </Form.Item>

            <Form.Item label="確認密碼" name="confirm">
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
