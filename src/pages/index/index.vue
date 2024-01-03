<template>
  <view>
    <!--  -->
    <swiper
      class="swiper"
      circular
      :indicator-dots="true"
      :autoplay="true"
      :interval="2000"
      :duration="500"
    >
      <swiper-item v-for="i in slideShow">
        <img class="img" :src="i.url" />
      </swiper-item>
    </swiper>
    <view class="btn" @click="toCate">租 赁</view>
  </view>

  <!--  -->
  <uni-notice-bar
    show-icon
    scrollable
    text="uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
  />

  <!--  -->
  <view class="content">
    <navigator
      class="spu"
      v-for="i in product"
      :url="`/pages/productInfo/index?id=${i.id}`"
    >
      <view class="img">
        <img style="width: 100%; height: 100%" :src="i.pic" />
      </view>
      <view class="info">
        <view class="name">{{ i.name }}</view>
        <view class="pri">
          <view class="price">¥{{ i.price }}</view>
          <view class="icon">
            <uni-icons type="cart" size="20" color="green"></uni-icons>
          </view>
        </view>
      </view>
    </navigator>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { slideShowList, productList } from "@/api/index";
onMounted(() => {
  getHas();
});
//获取数据
const slideShow = ref([]);
const product = ref([]);
const getHas = async () => {
  let res = await slideShowList();
  slideShow.value = res.data.list;
  const data = {
    pageNum: 1,
    pageSize: 100000,
    sortType: 0,
  };
  let res1 = await productList({ params: { data } });
  product.value = res1.data.list;
};

const toCate = () => {
  uni.switchTab({ url: "/pages/category/index" });
};
</script>

<style lang="scss">
.swiper {
  //height: 340rpx;
  height: 100vh;
  width: 100%;
  position: relative;
  .img {
    width: 100%;
    height: 100%;
  }
}

.btn {
  width: 350rpx;
  height: 150rpx;
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 50%;
  bottom: 130rpx;
  transform: translateX(-50%);
  border-radius: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 85rpx;
  color: rgb(36, 112, 8);
  font-weight: bold;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .spu {
    width: 332rpx;
    margin: 20rpx;
    .img {
      width: 100%;
      height: 320rpx;
    }
    .info {
      .name {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 显示两行文本 */
        -webkit-box-orient: vertical;
        margin: 10rpx;
        font-size: 28rpx;
      }
      .pri {
        display: flex;
        justify-content: space-between;
        margin: 15rpx;
        .price {
          font-size: 32rpx;
          color: rgb(41, 186, 30);
        }
      }
    }
  }
}
</style>
