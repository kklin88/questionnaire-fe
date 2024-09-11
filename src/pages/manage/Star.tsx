import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { Empty, Spin, Typography, Pagination } from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
const { Title } = Typography;
const Star: FC = () => {
  useTitle("kk問卷 - 星標問卷");
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星標問卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {!loading && list.length === 0 && <Empty description="暫無數據" />}
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;
