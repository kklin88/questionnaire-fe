// useLoadQuestionData
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
function useLoadQuestionData() {
  const { id = "" } = useParams();
  //   const [loading, setLoading] = useState(true);
  //   const [questionData, setQuestionData] = useState({});
  //   useEffect(() => {
  //     async function fn() {
  //       const data = await getQuestionService(id);
  //       setQuestionData(data);
  //       setLoading(false);
  //     }
  //     fn();
  //   }, []);
  //   return {loading,questionData}
  async function load() {
    const data = await getQuestionService(id);
    return data;
  }
  const { data, error, loading } = useRequest(load);
  return { data, error, loading };
}
export default useLoadQuestionData;
