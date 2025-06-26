export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;

  onchange?: (newProps: QuestionInputPropsType) => void;
};
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "輸入框標題",
  placeholder: "請輸入內容",
};
