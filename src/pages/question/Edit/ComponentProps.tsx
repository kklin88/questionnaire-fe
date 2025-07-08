import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentsPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { changeComponentProps } from "../../../store/componentsReducer";
const NoProps: FC = () => {
  return <div style={{ textAlign: "center" }}>未選中組件</div>;
};
const ComponentProps: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProps />;
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProps />;

  function changeProps(newProps: ComponentsPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
    console.log("newProps", fe_id, newProps);
  }
  const { PropsComponent } = componentConf;
  return (
    <PropsComponent
      {...props}
      onChange={changeProps}
      disabled={isLocked || isHidden}
    />
  );
};
export default ComponentProps;
