import React, { FC } from "react";
import { useParams } from "react-router-dom";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData();
  return <>stat {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}</>;
};

export default Stat;
