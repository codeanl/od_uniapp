const baseURL = "http://localhost:8080"; // 设置基础URL
// const baseURL = "http://localhost:5678";
// 封装请求方法
export const request = (url, method = "GET", data = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + url, // 拼接完整的请求URL
      method,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
