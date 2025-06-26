import React, { FC, useEffect } from "react";
import { Form, Input } from "antd";
import { QuestionInputPropsType } from "./interface";
const PropsComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType,
) => {
  const { title, placeholder, onchange } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  function handleValueChange() {
    if (onchange) {
      onchange(form.getFieldsValue());
    }
  }
  return (
    <Form layout="vertical" form={form} onValuesChange={handleValueChange}>
      <Form.Item
        label="標題"
        name="title"
        rules={[{ required: true, message: "請輸入標題" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="placeholder" label="Placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default PropsComponent;
