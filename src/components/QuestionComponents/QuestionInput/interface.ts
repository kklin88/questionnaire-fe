export type QuestionInputPropsType = {
  title?: string;
  placeholder?: string;

  onChange?: (newProps: QuestionInputPropsType) => void;
  disabled?: boolean;
};
export const QuestionInputDefaultProps: QuestionInputPropsType = {
  title: "輸入框標題",
  placeholder: "請輸入內容",
};
