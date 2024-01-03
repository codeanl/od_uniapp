<template>
  <view>
    <!--  -->
    <view class="top">
      <navigator class="userinfo" url="/pages/profile/index" v-if="userInfo">
        <view>
          <image
            style="width: 100rpx; height: 100rpx; border-radius: 50%"
            :src="userInfo.avatar"
          ></image>
        </view>
        <view>
          <view class="username">{{ userInfo.nickname }}</view>
          <view class="uid">uid:{{ userInfo.id }}</view>
        </view>
      </navigator>
      <!--  -->
      <navigator class="userinfo" url="/pages/login/index" v-if="!userInfo">
        <view>
          <image
            style="width: 100rpx; height: 100rpx; border-radius: 50%"
            src="../../static/icon/头像.png"
          ></image>
        </view>
        <view>
          <view class="username">未登录</view>
        </view>
      </navigator>
      <!--  -->
      <view class="qc" v-if="userInfo">
        <uni-tag text="客户码" type="success" size="mini" />
      </view>
    </view>

    <!--  -->
    <uni-card title="订单" class="order">
      <view class="card-content">
        <navigator
          class="item"
          v-for="(i, index) in orderList"
          :url="`/pages/orderList/index?status=${index}`"
        >
          <image
            class="image"
            :src="i.url"
            mode="aspectFill"
            style="width: 50rpx; height: 50rpx"
          />
          <view>{{ i.name }}</view>
        </navigator>
      </view>
    </uni-card>

    <!--  -->
    <uni-card title="我的服务" class="fuwu">
      <uni-grid :column="4" :show-border="false" :square="false">
        <uni-grid-item>
          <navigator url="/pages/setting/index">
            <view class="grid-item-box">
              <image
                class="image"
                src="../../static/icon/设置.png"
                mode="aspectFill"
              />
              <text class="text">设置</text>
            </view>
          </navigator>
        </uni-grid-item>
        <!--  -->
        <uni-grid-item
          v-for="(item, index) in list"
          :index="index"
          :key="item.content"
          v-if="userInfo"
        >
          <navigator @click="navigateToPage(item.content)">
            <view class="grid-item-box">
              <image class="image" :src="item.url" mode="aspectFill" />
              <text class="text">{{ item.text }}</text>
            </view>
          </navigator>
        </uni-grid-item>
      </uni-grid>
    </uni-card>
  </view>
</template>

<script setup>
const orderList = [
  {
    name: "全部",
    url: "../../static/icon/准备中.png",
  },
  {
    name: "待支付",
    url: "../../static/icon/未支付.png",
  },
  {
    name: "准备中",
    url: "../../static/icon/准备中.png",
  },
  {
    name: "待取货",
    url: "../../static/icon/待取货.png",
  },
  {
    name: "租赁中",
    url: "../../static/icon/进行中.png",
  },
];
const list = [
  {
    url: "../../static/icon/收货地址.png",
    text: "收货地址",
    content: "address",
  },
  {
    url: "../../static/icon/购物车.png",
    text: "购物车",
    content: "cart",
  },
  {
    url: "../../static/icon/收藏.png",
    text: "收藏",
    content: "1",
  },
  {
    url: "../../static/icon/浏览记录.png",
    text: "浏览记录",
    content: "1",
  },
  {
    url: "../../static/icon/退出登录.png",
    text: "退出登录",
    content: "login",
  },
];

let userInfo = uni.getStorageSync("userInfo");

const navigateToPage = (content) => {
  let url = `/pages/${content}/index`;
  //跳转
  uni.navigateTo({
    url: `/pages/${content}/index`,
  });
  if (content == "login") {
    // 清除存储的个人信息
    uni.removeStorageSync("userInfo");
  }
};
</script>

<style lang="scss">
.top {
  display: flex;
  align-items: center;
  height: 320rpx;
  //background-color: rgb(255, 255, 255);
  background: linear-gradient(to bottom, #e8eede, #beebaf);
  justify-content: space-between;
  padding: 0 60rpx;
  .userinfo {
    display: flex;
    align-items: center;
    .username {
      margin-left: 15rpx;
      font-size: 30rpx;
    }
    .uid {
      margin-left: 15rpx;
      font-size: 20rpx;
      color: #343232;
    }
  }
}

.order {
  margin-top: 20rpx;
  .card-content {
    display: flex;
    justify-content: space-between;
    .item {
      text-align: center;
    }
  }
}

.fuwu {
  .image {
    width: 60rpx;
    height: 60rpx;
  }
  .text {
    font-size: 16px;
    margin-top: 5px;
  }
  .grid-item-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
  }
}
</style>
