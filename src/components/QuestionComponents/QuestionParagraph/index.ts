/**
 *
 * @description 問卷 段落
 */

import Component from "./Component";
import PropsComponent from "./PropsComponent";
import {
  QuestionParagraphPropsType,
  QuestionParagraphDefaultProps,
} from "./interface";

export * from "./interface"; // 导出 interface 屬性類型 defaultprops
//Paragraph 屬性的配置
export default {
  title: "段落",
  type: "questionParagraph",
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
