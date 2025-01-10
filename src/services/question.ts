import axios from "./ajax";
import type { ResDataType } from "./ajax";
type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};
// 獲取的那個問卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
// 創建問卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

export async function getQuestionListService(
  // Partial 表示任意參數都可以 類型的一部分 請求的時候加入參數 /api/question？a=10&b=20
  opt: Partial<SearchOption> = {},
): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}
//更新單個問卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any },
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// 複製問卷
export async function duplicateQuestionService(
  id: string,
): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}'`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 批量徹底刪除
export async function deleteQuestionService(
  ids: string[],
): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}
