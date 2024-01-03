<template>
  <!--  -->
  <view class="search">
    <navigator url="/pages/search/index" class="tosearch"> 搜索</navigator>
  </view>
  <!--  -->
  <view class="item">
    <!-- <view v-for="i in 5">分类</view> -->
    <uni-segmented-control
      :current="current"
      :values="items"
      style-type="text"
      active-color="#0b850b"
      @clickItem="onClickItem"
    />
  </view>
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
import { productList } from "@/api/index";
onMounted(() => {
  getHas();
});
const props = defineProps({
  name: {
    default: "",
  },
});
//获取数据
const product = ref([]);
const nowName = ref(props.name);
const getHas = async () => {
  let res = await productList({
    name: nowName.value,
    sortType: parseInt(current.value),
  });
  product.value = res.data.list;
};

//

const items = ["推荐", "最新", "价格⬆️", "价格⬇️"];
const current = ref(0);
const onClickItem = (e) => {
  if (current !== e.currentIndex) {
    current.value = e.currentIndex;
  }
  getHas();
};
</script>

<style lang="scss">
.search {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .tosearch {
    width: 95%;
    height: 74rpx;
    background-color: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20rpx;
  }
}
.item {
  height: 80rpx;
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
