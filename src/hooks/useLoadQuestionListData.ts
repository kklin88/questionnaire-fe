import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService } from "../services/question";
import { useParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("keyword"));
  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

      const data = await getQuestionListService({ keyword, isStar, isDeleted });
      return data; //{list,total}
    },
    {
      refreshDeps: [searchParams], //刷新的依賴項
    },
  );
  return { data, loading, error };
}
export default useLoadQuestionListData;
