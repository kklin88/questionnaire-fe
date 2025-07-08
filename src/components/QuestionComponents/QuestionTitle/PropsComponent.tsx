import React, { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select } from "antd";
import { QuestionTitlePropsType } from "./interface";
const PropsComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType,
) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);
  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={handleValueChange}
      layout="vertical"
      disabled={disabled}
    >
      <Form.Item
        label="題目内容"
        name="text"
        rules={[{ required: true, message: "請速入標題內容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="題目等級" name="level">
        <Select
          options={[
            { value: 1, text: "1" },
            { value: 2, text: "2" },
            { value: 3, text: "3" },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item label="題目居中" name="isCenter" valuePropName="checked">
        <Checkbox>居中顯示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
