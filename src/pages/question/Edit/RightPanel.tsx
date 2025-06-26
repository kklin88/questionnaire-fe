import React, { Children, FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProps from "./ComponentProps";
const RightPanel: FC = () => {
  const tabItems = [
    {
      key: "props",
      label: (
        <span>
          <FileTextOutlined />
          Properties
        </span>
      ),
    },
    {
      key: "settings",
      label: (
        <span>
          <SettingOutlined />
          Settings頁面設置
        </span>
      ),
      children: (
        <div>
          <ComponentProps />
        </div>
      ),
    },
  ];
  return <Tabs defaultActiveKey="props" items={tabItems}></Tabs>;
};

export default RightPanel;
