import React, { FC, useEffect } from "react";
import { Checkbox, Form, Input } from "antd";
import { QuestionParagraphPropsType } from "./interface";
import { on } from "events";
const { TextArea } = Input;
// 屬性表單 獲取Form組件
const PropsComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType,
) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  function handleValuesChange() {
    console.log("form.getFieldsValue()", form.getFieldsValue());

    //  使用onChange
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="段落內容"
        name="text"
        rules={[{ required: true, message: "請輸入段落內容" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中顯示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropsComponent;
