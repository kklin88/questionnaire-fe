import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle, useRequest, useDebounceFn } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Empty, Spin, Typography } from "antd";
import ListPage from "../../components/ListPage";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
// import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
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
  // const { data = {}, loading } = useLoadQuestionListData();

  // const { list = [], total = 0 } = data;
  // const [list, setList] = useState([]);
  const [started, setStarted] = useState(false); //標記是否已經開始加載 （防抖，有延遲時間）
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1); //List 內部的數據，不再url參數中體現
  const [list, setList] = useState([]); //全部的列表數據，上滑加載更多，累計
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length; //有沒有更多的，未加載完成的數據
  const [searchParams] = useSearchParams(); //url參數，雖然沒有page pageSize，但有keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  // 真正加載
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l)); //累計
        setTotal(total);
        setPage(page + 1);
      },
    },
  );
  // 嘗試去觸發加載
  // 防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        console.log("load more");
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );
  // 1.當頁面加載,或者url參數（keyword）變化時，觸發加載
  useEffect(() => {
    tryLoadMore(); //加載第一頁
  }, [searchParams]);

  // 2.頁面滾動時，嘗試觸發加載
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore); //需要考慮防抖
    }
    return () => {
      window.removeEventListener("scroll", tryLoadMore); //解綁事件，重要！！！
    };
  }, [searchParams, haveMoreData]);
  // const [loading,setLoading] = useState(false)

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
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暫無數據" />;
    if (!haveMoreData) return <span>沒有更多了</span>;
    return <span>開始加載下一頁</span>;
  }, [started, loading, haveMoreData]);
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
        {/* {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )} */}
        {list.length > 0 &&
          list.map((q: any) => {
            //   通過{...q}解構傳遞所有屬性

            return <QuestionCard key={q._id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
