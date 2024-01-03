<template>
  <!-- <view class="info">
    <view class="img">
      <image
        style="width: 100rpx; height: 100rpx; border-radius: 50%"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      ></image>
    </view>
    <view>
      <view class="username">长谷川安</view>
      <view class="uid">uid:1000000001</view>
    </view>
  </view> -->
  <!--  -->
  <uni-list :border="true" v-for="i in settingList">
    <view class="list">
      <text class="name">{{ i.name }}</text>
      <text class="icon">></text>
    </view>
  </uni-list>
</template>

<script lang="ts" setup>
const settingList = [
  {
    name: "安全中心",
    content: "an",
  },
  {
    name: "隐私协议",
    content: "an",
  },
  {
    name: "用户协议",
    content: "an",
  },
  {
    name: "其他协议",
    content: "an",
  },
];
</script>

<style lang="scss">
.info {
  height: 200rpx;
  width: 100%;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  .img {
    margin-left: 20rpx;
  }
  .username {
    margin-left: 25rpx;
    font-size: 30rpx;
  }
  .uid {
    margin-left: 25rpx;
    font-size: 20rpx;
    color: #343232;
  }
}
.list {
  display: flex;
  justify-content: space-between;
  height: 120rpx;
  align-items: center;
  margin: 0 34rpx;
  .name {
    font-size: 32rpx;
    color: rgb(54, 53, 53);
  }
  .icon {
    font-size: 30rpx;
    color: rgb(89, 87, 87);
  }
}
</style>
