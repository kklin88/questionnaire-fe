/**
 * @description: 問卷 輸入框
 */

import { QuestionInputDefaultProps } from "./interface";
import PropsComponent from "./PropsComponent";
import Component from "./Component";
export * from "./interface";

export default {
  title: "輸入框",
  type: "questionInput", //需要和後端統一好
  Component, //中間畫布顯示的組件
  PropsComponent, //右側顯示的屬性組件
  defaultProps: QuestionInputDefaultProps,
};
