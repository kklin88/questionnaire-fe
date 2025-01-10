import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRequest, useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import {
  Empty,
  Table,
  Typography,
  Tag,
  Space,
  Button,
  Modal,
  Spin,
  message,
} from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../services/question";
const { Title } = Typography;
const { confirm } = Modal;
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

const Trash: FC = () => {
  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  const [selectIds, setSelectIds] = useState<string[]>([]);
  // 恢復
  const { run: recover } = useRequest(
    async () => {
      // 批量恢復 for await 遍歷執行異步handler
      for await (const id of selectIds) {
        await updateQuestionService(id, { isDelete: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess() {
        message.success("恢復成功");
        refresh(); //恢復完重新刷新
        setSelectIds([]);
      },
    },
  );
  // 批量測底刪除
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectIds),
    {
      manual: true,
      onSuccess() {
        message.success("刪除成功");
        refresh();
        setSelectIds([]);
      },
    },
  );
  const tableColums = [
    { title: "標題", dataIndex: "title" },
    {
      title: "是否發布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已發布</Tag>
        ) : (
          <Tag>未發布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "創建事件",
      dataIndex: "createdAt",
    },
  ];
  function del() {
    confirm({
      title: "確認徹底刪除該問卷",
      icon: <ExclamationCircleOutlined />,
      content: "刪除以後不能找回",
      onOk: deleteQuestion,
    });
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectIds.length === 0}
            onClick={recover}
          >
            恢復
          </Button>

          <Button danger disabled={selectIds.length === 0} onClick={del}>
            徹底刪除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColums}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            console.log("selectedRowKeys", selectedRowKeys);
            setSelectIds(selectedRowKeys as string[]);
          },
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暫無數據" />}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
