import { Pagination } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const { total } = props;
  // 獲取url參數中的page和pageSize參數，並且同步中 Pagination組件中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  //   page pageSize改變時，跳轉頁面（改變url參數）
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    console.log(page, pageSize); //改變url參數
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    console.log(searchParams.toString());
    nav({ pathname, search: searchParams.toString() }); // 除了改變page pageSize 之外，其他的url參數要帶著keyword
  }
  return (
    <>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </>
  );
};
export default ListPage;
