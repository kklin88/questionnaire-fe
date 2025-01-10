import React, { FC, useEffect, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData();
  return (
    <>
      <p>Edit page</p>
      {/* 在loading的過程中顯示loading的效果，loading完成顯示結果 */}
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Edit;
