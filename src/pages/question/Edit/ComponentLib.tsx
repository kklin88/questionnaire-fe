import React, { FC } from "react";
import { Divider, Typography } from "antd";
import { nanoid } from "@reduxjs/toolkit";
import {
  componentConfGroup,
  ComponentsConfType,
} from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { addComponent } from "../../../store/componentsReducer";
import styles from "./ComponentLib.module.scss";
const { Title } = Typography;

// ✅ 改成 React 組件
const ComponentItem: FC<{ c: ComponentsConfType }> = ({ c }) => {
  const dispatch = useDispatch();
  const { title, type, Component, defaultProps } = c;

  function handleClick() {
    const fe_id = nanoid();
    dispatch(addComponent({ fe_id, title, type, props: defaultProps }));
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
};

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title
              level={3}
              style={{ fontSize: "16px", marginTop: index > 0 ? "20px" : "0" }}
            >
              {groupName}
            </Title>
            <div>
              {components.map((c) => (
                <ComponentItem key={c.type} c={c} /> // ✅ 改成組件
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
