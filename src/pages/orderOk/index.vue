<template>
  <view class="overview">
    <view class="status">下单成功</view>
    <view class="buttons">
      <navigator
        hover-class="none"
        class="button"
        url="/pages/index/index"
        open-type="switchTab"
      >
        返回首页
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.overview {
  line-height: 1;
  padding: 160rpx 0;
  color: #fff;
  background-color: #27ba9b;

  .status {
    font-size: 36rpx;
    font-weight: 500;
    text-align: center;
  }

  .status::before {
    display: block;
    font-size: 110rpx;
    margin-bottom: 20rpx;
  }

  .buttons {
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60rpx;
  }

  .button {
    text-align: center;
    margin: 0 10rpx;
    font-size: 28rpx;
    color: #fff;

    &:first-child {
      width: 200rpx;
      border-radius: 64rpx;
      border: 1rpx solid #fff;
    }
  }
}
</style>
