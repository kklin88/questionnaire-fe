import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Empty, Typography } from "antd";
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

const Star: FC = () => {
  const [questonList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星標問卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questonList.length === 0 && <Empty description="暫無數據" />}
        {questonList.length > 0 &&
          questonList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>next page</div>
    </>
  );
};

export default Star;
