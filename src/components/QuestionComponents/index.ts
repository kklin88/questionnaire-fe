import type { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, {
  QuestionParagraphPropsType,
} from "./QuestionParagraph";
// 統一，各個組件的props type
export type ComponentsPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType;

//統一，各個組件的配置
export type ComponentsConfType = {
  title: string;
  type: string;
  Component: FC<ComponentsPropsType>; //React元件
  PropsComponent: FC<ComponentsPropsType>; //props的顯示元件 屬性表單
  defaultProps: ComponentsPropsType;
};
// 全部的組件配置的列表
const componentConfList: ComponentsConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
];

// 組件分組
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本顯示",
    components: [QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用戶輸入框",
    components: [QuestionInputConf],
  },
];

//根據類型返回當前的組件 回傳一個元件的「註冊配置物件」
export function getComponentConfByType(type: string) {
  return componentConfList.find((item) => item.type === type);
}
