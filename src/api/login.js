import { request } from "./../utils/http";

export const MemberLogin = (data) => {
  return request("/front/member/login", "POST", data);
};
