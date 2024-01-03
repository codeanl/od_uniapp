<template>
  <scroll-view scroll-y class="box">
    <!--  -->
    <view class="status">
      <uni-steps
        :options="list"
        active-color="#007AFF"
        :active="active"
        direction="column"
      />
    </view>
    <!--  -->
    <view class="pro">
      <view class="spuInfo" v-for="i in orderInfo.sku">
        <view class="img">
          <img style="width: 100%; height: 100%" :src="i.pic" />
        </view>
        <view class="name">
          <view class="spuuname">{{ i.name }}</view>
          <view class="sku">{{ i.tag }}</view>
          <view class="price">
            <view class="pri">¥{{ i.price }}</view>
            <view class="count">x{{ i.count }}</view>
          </view>
        </view>
      </view>
      <!--  -->
    </view>
    <!--  -->
    <view class="pri">
      <view class="low">
        <view class="title">商品总价</view>
        <view class="content">¥{{ orderInfo.totalAmount }}</view>
      </view>
      <view class="low">
        <view class="title">运费</view>
        <view class="content">¥{{ orderInfo.freightAmount }}</view>
      </view>
      <view class="low">
        <view class="title">押金</view>
        <view class="content">¥{{ orderInfo.pledgeAmount }}</view>
      </view>
      <view class="low">
        <view class="title">应付金额</view>
        <view class="content">¥{{ orderInfo.totalAmount }}</view>
      </view>
    </view>
    <!--  -->
    <view class="orderInfo">
      <view class="low">
        <view class="title">订单编号</view>
        <view class="content">{{ orderInfo.orderSn }}</view>
      </view>
      <view class="low">
        <view class="title">下单时间</view>
        <view class="content">{{ orderInfo.createdTime }}</view>
      </view>
      <view class="low">
        <view class="title">预约时间</view>
        <view class="content">{{ orderInfo.bookedTime }}</view>
      </view>
      <view class="low">
        <view class="title">支付时间</view>
        <view class="content">{{ orderInfo.paymentTime }}</view>
      </view>
    </view>
  </scroll-view>
  <!--  -->
  <!-- <view class="buttom">
    <button
      type="primary"
      style="margin: 30px 10px; width: 100px"
      @click="change()"
    >
      改变
    </button>
  </view> -->
</template>
<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  id: {
    default: "",
  },
});
const active = ref(1);
const list = [
  {
    title: "买家下单",
    desc: "2018-11-11",
  },
  {
    title: "准备中",
    desc: "2018-11-12",
  },
  {
    title: "待取货",
    desc: "2018-11-13",
  },
  {
    title: "租赁中",
    desc: "2018-11-14",
  },
  {
    title: "订单完成",
    desc: "2018-11-14",
  },
];
import { OrderInfo, UpdateOrder } from "@/api/order";

onMounted(() => {
  getHas();
});
const orderInfo = ref();
let userInfo = uni.getStorageSync("userInfo");
const getHas = async () => {
  let res = await OrderInfo({ id: parseInt(props.id) });
  if (res.code == 200) {
    orderInfo.value = res.data;
    active.value = parseInt(res.data.status) - 1;
  }
};

const change = async () => {
  let sta = String(parseInt(orderInfo.value.status) + 1);
  var data = {
    id: orderInfo.value.id,
    status: sta,
  };
  let res = await UpdateOrder(data);
  if (res.code == 200) {
    getHas();
  }
};
</script>

<style lang="scss">
.box {
  background-color: rgb(236, 235, 235);
  height: calc(100vh - 120rpx);
  .status {
    padding: 20rpx 80rpx;
    background-color: rgb(255, 255, 255);
  }
  //
  .pro {
    background-color: rgb(255, 255, 255);
    margin-top: 15rpx;
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
          -webkit-line-clamp: 2;
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
      margin: 0 10 rpx;
      display: flex;
      justify-content: space-between;
      .pri {
        color: rgb(30, 172, 30);
        font-size: 30rpx;
      }
      .count {
        color: rgb(115, 110, 110);
        font-size: 30rpx;
      }
    }
  }
  //
  .pri {
    background-color: rgb(255, 255, 255);
    margin-top: 15rpx;
    padding: 0 20rpx;
    .low {
      display: flex;
      justify-content: space-between;
      margin: 2rpx 20rpx;
      .title {
        color: rgb(33, 33, 33);
        font-size: 34rpx;
      }
      .content {
        color: rgb(77, 77, 77);
        font-size: 32rpx;
      }
    }
  }
  //
  .orderInfo {
    background-color: rgb(255, 255, 255);
    margin-top: 15rpx;
    padding: 0 20rpx;
    .low {
      display: flex;
      justify-content: space-between;
      margin: 2rpx 20rpx;
      .title {
        color: rgb(33, 33, 33);
        font-size: 34rpx;
      }
      .content {
        color: rgb(77, 77, 77);
        font-size: 32rpx;
      }
    }
  }
}
//
.buttom {
  height: 120rpx;
  width: 100%;
  background-color: rgb(255, 255, 255);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
