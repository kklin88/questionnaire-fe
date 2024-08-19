// webpack.config.js
module.exports = {
  // 其他配置
  devServer: {
    proxy: {
      "/api": { target: "http://localhost:3001" }, // 將 /api 的請求代理到 http://localhost:3001
    },
  },
};
