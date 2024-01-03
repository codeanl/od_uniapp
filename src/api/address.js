import { request } from "./../utils/http";

export const AddressList = (data) => {
  return request("/front/address/list", "GET", data);
};

export const SaveOrUpdateAddress = (data) => {
  return request("/front/address", "POST", data);
};

export const DeleteAddress = (data) => {
  return request("/front/address/del", "POST", data);
};


{/* <view class="img">
<img
  style="width: 100%; height: 100%"
  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
/>
</view>
<view class="name">
<view class="spuuname">name</view>
<view class="sku">sku</view>
<view class="pri">
  <view class="pric">¥11</view>
  <view class="count">1</view>
</view>
</view> */}