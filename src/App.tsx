import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import "antd/dist/reset.css";
import "./App.css";
import List from "./pages/manage/List";
function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;

// src/components 目錄 - 組件
// src/pages 目錄 - 頁面
