import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
} from "../store/componentsReducer";
import useGetComponentInfo from "./useGetComponentInfo";

// 綁定快捷鍵
// 判斷當前鼠標位置是不是在畫布裡
/*
    1. 刪除組件
    2. 複製組件
    3. 粘貼組件
*/
function isActiveElementValid() {
  const activeElem = document.activeElement;
  // 當前的光標沒有focus到input或其他表單元素
  if (activeElem === document.body) return true;

  // 檢查是否是表單元素
  if (
    activeElem &&
    (activeElem.tagName === "INPUT" ||
      activeElem.tagName === "TEXTAREA" ||
      activeElem.tagName === "SELECT" ||
      (activeElem as HTMLElement).contentEditable === "true")
  ) {
    return false;
  }

  return true;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();
  const { selectedId, copiedComponent } = useGetComponentInfo();

  // 刪除組件
  useKeyPress(["backspace", "delete"], () => {
    if (!isActiveElementValid()) return;
    if (!selectedId) return; // 沒有選中組件時不執行
    dispatch(removeSelectedComponent());
  });

  // 複製組件
  useKeyPress(["ctrl+c", "meta+c"], () => {
    if (!isActiveElementValid()) return;
    if (!selectedId) return; // 沒有選中組件時不執行
    dispatch(copySelectedComponent());
  });

  // 粘貼組件
  useKeyPress(["ctrl+v", "meta+v"], () => {
    if (!isActiveElementValid()) return;
    if (!copiedComponent) return; // 沒有複製的組件時不執行
    dispatch(pasteCopiedComponent());
  });
}

export default useBindCanvasKeyPress;
