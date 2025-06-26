/**
 * @description: 問卷 標題Title
 */

import { QuestionTitleDefaultProps } from "./interface";
import PropsComponent from "./PropsComponent";
import Component from "./Component";
export * from "./interface";
//組件的配置
export default {
  title: "標題",
  type: "questionTitle", //需要和後端統一好
  Component, //在中間畫布顯示的組件
  PropsComponent, //右側修改屬性面板
  defaultProps: QuestionTitleDefaultProps,
};
