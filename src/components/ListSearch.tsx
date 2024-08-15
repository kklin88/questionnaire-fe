import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Input } from "antd";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
const { Search } = Input;
const ListSearch = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  //   獲取url參數，並設置到搜索框input value
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]);

  function handleSearch(value: string) {
    console.log(value);
    //跳轉頁面，增加url參數
    nav({ pathname, search: `${LIST_SEARCH_PARAM_KEY}=${value}` });
  }
  return (
    <>
      <Search
        size="large"
        placeholder="輸入關鍵字"
        onSearch={handleSearch}
        onChange={handleChange}
        enterButton
        style={{ width: "260px" }}
        allowClear
      />
    </>
  );
};
export default ListSearch;
