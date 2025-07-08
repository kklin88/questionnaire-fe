// useLoadQuestionData 加載問卷信息
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
function useLoadQuestionData() {
  const dispatch = useDispatch();
  const { id = "" } = useParams();
  //ajax加載
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("id is required");
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    },
  );
  //   根據獲取的data設置 redux store
  useEffect(() => {
    if (!data) return;
    const { componentList = [] } = data;
    // 獲取默認的selectedId
    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; //默認選中第一個組件
    }
    // 把componentList存到redux state，包含完整的 ComponentsStateType
    dispatch(
      resetComponents({
        componentList,
        selectedId,
        copiedComponent: null, // 添加缺失的屬性
      }),
    );
  }, [data, dispatch]);
  //判斷id變化，執行ajax加載問卷數據
  useEffect(() => {
    run(id);
  }, [id, run]);
  return { loading, error };
}
export default useLoadQuestionData;
