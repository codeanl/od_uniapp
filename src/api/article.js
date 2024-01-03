import { request } from "../utils/http";

export const ArticleList = (data) => {
  return request("/front/artical/list", "GET", data);
};

export const SaveOrUpdateArticle = (data) => {
  return request("/front/artical/artical", "POST", data);
};

export const DeleteArticle = (data) => {
  return request("/front/artical/del", "POST", data);
};

export const ArticleInfo = (data) => {
  return request("/front/artical/info", "GET", data);
};
