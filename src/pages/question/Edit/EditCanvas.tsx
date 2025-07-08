import React, { FC, MouseEvent } from "react";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";

import styles from "./EditCanvas.module.scss";
import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Component";
import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Component";
import {
  changeSelectedId,
  ComponentsInfoType,
} from "../../../store/componentsReducer";
type PropsType = {
  loading: boolean;
};
//動態生成組件
function genComponent(componentInfo: ComponentsInfoType) {
  const { type, props } = componentInfo; //每個組件的信息，是從redux store中獲取的（服務端獲取存儲到redux中）

  // 根據type獲取組件的配置
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf; //config中獲取組件
  //每個組件可以接收props，並且根據props渲染
  return <Component {...props} />;
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation(); //阻止事件冒泡
    dispatch(changeSelectedId(id));
  }
  useBindCanvasKeyPress();
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;
          //拼接classname
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });
          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(e, fe_id)}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
      {/* <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};

export default EditCanvas;
