import { request } from "./../utils/http";

export const catagoryListFirst = () => {
  return request("/front/category/list", "GET");
};

export const GetListNextCateAndSpu = (data) => {
  return request("/front/product/categoryAll", "GET", data);
};
