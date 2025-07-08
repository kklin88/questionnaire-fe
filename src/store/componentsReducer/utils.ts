import { ComponentsInfoType, ComponentsStateType } from ".";

/**
 * 獲取下一個selectedId
 * @param fe_id 當前的id
 * @param componentList 組件列表
 * @returns
 */
export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentsInfoType[],
) {
  const visibleComponentList = componentList.filter((item) => !item.isHidden);
  const index = visibleComponentList.findIndex((item) => item.fe_id === fe_id);
  if (index < 0) return "";
  // 重新計算selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length <= 1) {
    //組件長度就一個，被刪除就沒有組件了
    newSelectedId = "";
  } else {
    // 組件長度>1
    if (index + 1 === length) {
      // 最後一個，就要選上一個
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      // 不是最後一個，就選下一個
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }
  return newSelectedId;
}
/**
 * 插入新組件
 * @param draft //state draft
 * @param newComponent  //新增的組件
 */

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentsInfoType,
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((item) => item.fe_id === selectedId);
  if (index < 0) {
    // 沒選中任何組件 → 加在最後
    componentList.push(newComponent);
  } else {
    // ✅ 插入在選中組件後
    componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
}
