import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Divider, Popconfirm, Space, Tag, Modal } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};
// 給FC傳入一個泛型
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;
  function duplicate() {}
  function del() {
    confirm({
      title: "確定刪除該問卷？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        alert("del");
      },
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已發布</Tag>
            ) : (
              <Tag>未發布</Tag>
            )}

            <Tag>答卷：{answerCount}</Tag>

            <Tag>{createdAt}</Tag>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px" }} />
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              編輯問卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              數據統計
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} type="text" size="small">
              {isStar ? "取消標星" : "標星"}
            </Button>
            <Popconfirm
              title="確定複製該問卷？"
              onConfirm={duplicate}
              okText="確定"
              cancelText="取消"
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                複製
              </Button>
            </Popconfirm>

            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={del}
            >
              刪除
            </Button>
          </Space>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default QuestionCard;
