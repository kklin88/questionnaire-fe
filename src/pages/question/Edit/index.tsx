import React, { FC, useEffect, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditCanvas from "./EditCanvas";
import styles from "./index.module.scss";
import EditHeader from "./EditHeader";
const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }
  return (
    <div className={styles.container}>
      {/* 
     在loading的過程中顯示loading的效果，loading完成顯示結果 
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}
      */}
      <EditHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
