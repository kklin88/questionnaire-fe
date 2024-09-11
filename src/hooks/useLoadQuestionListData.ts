import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService } from "../services/question";
import { useParams } from "react-router-dom";
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from "../constant";
type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
// 可選參數 isStar, isDeleted 在函數調用的時候傳入
// searchParams通過useSearchParams()獲取搜索的關鍵字
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("keyword"));
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
        LIST_PAGE_SIZE;

      const data = await getQuestionListService({
        keyword,
        isStar,
        isDeleted,
        page,
        pageSize,
      });
      return data; //{list,total}
    },
    {
      refreshDeps: [searchParams], //刷新的依賴項
    },
  );
  return { data, loading, error };
}
export default useLoadQuestionListData;
