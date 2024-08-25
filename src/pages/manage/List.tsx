import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle, useRequest } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
const { Title } = Typography;
// const rawQuestionList = [
//   {
//     _id: "q1", // mongodb 數據庫 _id
//     title: "問卷1",
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createdAt: "03-11 11:00",
//   },
//   {
//     _id: "q2",
//     title: "問卷2",
//     isPublished: true,
//     isStar: true,
//     answerCount: 5,
//     createdAt: "03-12 16:00",
//   },
//   {
//     _id: "q3",
//     title: "問卷3",
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createdAt: "03-11 11:00",
//   },
// ];

const List: FC = () => {
  useTitle("kk问卷 - 我的问卷");
  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get('keyword'));
  // const [questionList, setQuestionList] = useState(rawQuestionList);
  const { data = {}, loading } = useLoadQuestionListData();

  const { list = [], total = 0 } = data;
  // const [list, setList] = useState([]);
  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService();
  //     const { list = [], total = 0 } = data;
  //     setList(list)
  //     setTotal(total)
  //   }
  //   load();
  // }, []);
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
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            //   通過{...q}解構傳遞所有屬性

            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore...</div>
    </>
  );
};

export default List;
