import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Typography } from "antd";
import ListSearch from "../../components/ListSearch";
const { Title } = Typography;
const rawQuestionList = [
  {
    _id: "q1", // mongodb 數據庫 _id
    title: "問卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: "03-11 11:00",
  },
  {
    _id: "q2",
    title: "問卷2",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createdAt: "03-12 16:00",
  },
  {
    _id: "q3",
    title: "問卷3",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: "03-11 11:00",
  },
];

const List: FC = () => {
  useTitle("kk问卷 - 我的问卷");
  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get('keyword'));
  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的問卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 問卷列表 */}
        {questionList.length > 0 &&
          questionList.map((q) => {
            //   通過{...q}解構傳遞所有屬性

            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore...</div>
    </>
  );
};

export default List;
