import { request } from "../utils/http";

export const OrderList = (data) => {
  return request("/front/order/list", "GET", data);
};

export const AddOrder = (data) => {
  return request("/front/order/add", "POST", data);
};
export const UpdateOrder = (data) => {
  return request("/front/order/update", "POST", data);
};

export const DeleteArticle = (data) => {
  return request("/front/order/del", "POST", data);
};

export const OrderInfo = (data) => {
  return request("/front/order/info", "GET", data);
};
