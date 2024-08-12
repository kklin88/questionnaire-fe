import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Empty, Table, Typography, Tag, Space, Button, Modal } from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
  const [questonList, setQuestionList] = useState(rawQuestionList);
  const [selectIds, setSelectIds] = useState<string[]>([]);
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
      onOk: () => alert(`刪除${JSON.stringify(selectIds)}`),
    });
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0}>
            恢復
          </Button>

          <Button danger disabled={selectIds.length === 0} onClick={del}>
            徹底刪除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questonList}
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
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questonList.length === 0 && <Empty description="暫無數據" />}
        {questonList.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>next page</div>
    </>
  );
};

export default Trash;
