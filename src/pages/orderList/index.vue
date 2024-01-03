<template>
  <view class="box">
    <view class="top">
      <!--  -->
      <view class="itemList">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="#0b850b"
          @clickItem="onClickItem"
        />
      </view>
    </view>
    <!--  -->
    <scroll-view scroll-y class="content">
      <navigator
        class="order"
        v-for="i in orderList"
        :url="`/pages/orderInfo/index?id=${i.id}`"
      >
        <view class="time">
          <view class="orderTime">{{ i.created_time }}</view>
          <view class="status">
            <view v-if="i.status == 1">待支付</view>
            <view v-if="i.status == 2">准备中</view>
            <view v-if="i.status == 3">待取货</view>
            <view v-if="i.status == 4">租赁中</view>
            <view v-if="i.status == 5">已归还</view>
          </view>
        </view>
        <view class="info">
          <view class="spuInfo" v-for="item in i.sku">
            <view class="img">
              <img style="width: 100%; height: 100%" :src="item.pic" />
            </view>
            <view class="name">
              <view class="spuuname">{{ item.name }}</view>
              <view class="sku">{{ item.tag }}</view>
            </view>
          </view>
          <view class="price"
            >共{{ i.sku?.length }}件商品，实付¥{{ gettPri(i.sku) }}</view
          >
        </view>
        <view class="btn"></view>
      </navigator>
    </scroll-view>
  </view>
</template>

<script setup>
const items = ["全部", "待付款", "准备中", "待取货", "租赁中"];
import { onMounted, ref } from "vue";
const current = ref(0);
const onClickItem = (e) => {
  if (current !== e.currentIndex) {
    current.value = e.currentIndex;
  }
  getHas();
};
//
const props = defineProps({
  status: {
    default: "",
  },
});

import { OrderList, UpdateOrder, DeleteArticle } from "@/api/order";
// 接收页面参数
onMounted(() => {
  current.value = parseInt(props.status);
  getHas();
});

const orderList = ref([]);
let userInfo = uni.getStorageSync("userInfo");
const getHas = async () => {
  let res = await OrderList({
    mid: userInfo.id,
    status: current.value.toString(),
    pageNum: 1,
    pageSize: 10000000,
  });
  if (res.code == 200) {
    orderList.value = res.data.list;
  }
  console.log(orderList.value);
};

function gettPri(sku) {
  var all = 0;
  for (let index = 0; index < sku.length; index++) {
    all = all + sku[index].price * sku[index].count;
  }
  return all;
}
</script>

<style lang="scss" scoped>
.box {
  background-color: rgb(245, 244, 244);
}
.top {
  height: 80rpx;
  background-color: white;
}
.content {
  height: calc(100vh - 80rpx);
  margin-bottom: 20rpx;
  .order {
    background-color: white;
    margin: 20rpx;

    .time {
      display: flex;
      justify-content: space-between;
      margin: 5rpx 15rpx;
      .orderTime {
        color: rgb(48, 47, 47);
        font-size: 30rpx;
      }
      .status {
        color: rgb(143, 141, 141);
        font-size: 30rpx;
      }
    }
    .spuInfo {
      display: flex;
      margin-top: 15rpx;

      .img {
        width: 200rpx;
        height: 180rpx;
        margin-left: 15rpx;
      }
      .name {
        width: 460rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10rpx 10rpx;
        .spuuname {
          color: rgb(48, 47, 47);
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 显示两行文本 */
          -webkit-box-orient: vertical;
          font-size: 30rpx;
        }
        .sku {
          color: rgb(115, 110, 110);
          font-size: 30rpx;
        }
      }
    }
    .price {
      text-align: right;
      color: rgb(102, 100, 100);
      font-size: 30rpx;
      padding: 10rpx 20rpx 10rpx 0;
    }
  }
}
</style>
