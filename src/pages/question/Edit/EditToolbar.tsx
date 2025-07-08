import { FC } from "react";
import { Space, Button, Tooltip } from "antd";
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, selectedComponent, copiedComponent } =
    useGetComponentInfo();

  // 安全地獲取 isLocked 屬性
  const isLocked = selectedComponent?.isLocked || false;
  // 刪除組件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  //   隱藏組件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  // 鎖定組件
  function handleLock() {
    dispatch(toggleComponentLock({ fe_id: selectedId }));
  }
  //   複製組件
  function copy() {
    dispatch(copySelectedComponent());
  }
  //   粘貼事件
  function paste() {
    // 判斷是否有複製
    dispatch(pasteCopiedComponent());
  }
  return (
    <Space>
      <Tooltip title="刪除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隱藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>

      <Tooltip title="鎖定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? "primary" : "default"}
        ></Button>
      </Tooltip>
      <Tooltip title="複製">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title="粘貼">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
    </Space>
  );
};
export default EditToolbar;
