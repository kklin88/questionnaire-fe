export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;
  //用於PropComponent
  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: "一行段落",
  isCenter: false,
};
