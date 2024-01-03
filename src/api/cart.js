import { request } from "./../utils/http";

export const CartList = (data) => {
  return request("/front/cart/list", "GET", data);
};

export const SaveOrUpdateCart = (data) => {
  return request("/front/cart/cart", "POST", data);
};

export const DeleteCart = (data) => {
  return request("/front/cart/del", "POST", data);
};
