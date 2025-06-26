import React, { Children, FC } from "react";
import { Tabs } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import ComponentLib from "./ComponentLib";
const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: "componentLib",
      label: (
        <span>
          <AppstoreOutlined />
          組件庫
        </span>
      ),
      children: (
        <div>
          <ComponentLib />
        </div>
      ),
    },
    {
      key: "layers",
      label: (
        <span>
          <BarsOutlined /> 圖層
        </span>
      ),
      children: <div>圖層</div>,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />;
};
export default LeftPanel;
