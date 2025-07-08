//定義組件需要的屬性類型以及默認屬性
export type QuestionTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3;
  isCenter?: boolean;

  onChange?: (newProps: QuestionTitlePropsType) => void;
  disabled?: boolean;
};
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: "一行標題",
  level: 1,
  isCenter: false,
};
