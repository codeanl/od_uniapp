import { request } from "./../utils/http";

export const slideShowList = () => {
  return request("/front/banner/list", "GET");
};

export const productList = (data) => {
  return request("/front/product/list", "GET", data);
};

export const productInfo = (data) => {
  return request("/front/product/info", "GET", data);
};
