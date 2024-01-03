<template>
  <view class="search">
    <navigator url="/pages/search/index" class="tosearch"> 搜索</navigator>
  </view>
  <!--  -->
  <view class="Ca">
    <!--  -->
    <scroll-view class="cate" scroll-y>
      <view
        v-for="(i, index) in catagoryList"
        :key="index"
        :class="['item', { active: selected === index }]"
        @click="selectItem(i.id, index)"
        class="catep"
      >
        {{ i.name }}
      </view>
    </scroll-view>
    <scroll-view class="content" scroll-y>
      <view class="cateItem" v-for="i in nextCateAndSpu">
        <view class="cate2">{{ i.name }}</view>
        <navigator
          class="spuList"
          v-for="j in i.product"
          :url="`/pages/productInfo/index?id=${j.id}`"
        >
          <view class="img">
            <img style="width: 100%; height: 100%" :src="j.pic" />
          </view>
          <view class="info">
            <view class="title">{{ j.name }}</view>
            <view class="price">¥{{ j.price }}</view>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
//
import { onMounted, ref } from "vue";
import { catagoryListFirst, GetListNextCateAndSpu } from "@/api/cate";
onMounted(() => {
  getHas();
});
//获取数据
const catagoryList = ref([]);
const getHas = async () => {
  let res = await catagoryListFirst();
  catagoryList.value = res.data;
  //
  selectItem(res.data[0].id, 0);
};
//
const selected = ref(0);
const nextCateAndSpu = ref([]);
const selectItem = async (id, index) => {
  selected.value = index;
  console.log(id);
  let res = await GetListNextCateAndSpu({ id: id });
  if (res.code == 200) {
    nextCateAndSpu.value = res.data;
  }
};
</script>

<style lang="scss">
.search {
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .tosearch {
    width: 90%;
    height: 74rpx;
    background-color: #dddbdb;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20rpx;
  }
}
.Ca {
  display: flex;
  height: calc(100vh - 120rpx);
  .cate {
    background-color: rgb(241, 241, 241);
    width: 20%;
    .catep {
      font-size: 32rpx;
      color: rgb(73, 73, 73);
    }
    .item {
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      cursor: pointer;
    }

    .active {
      background-color: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
      border-left: 5rpx solid #0f4b16;
    }
  }
  .content {
    width: 80%;
    .cateItem {
      margin: 10rpx;
      .cate2 {
        margin-left: 10rpx;
        font-size: 32rpx;
        color: #303030;
      }
      .spuList {
        display: flex;
        margin: 10rpx;
        width: 100%;
        .img {
          width: 300rpx;
          height: 150rpx;
          background-color: #8f918e;
        }
        .info {
          margin: 10rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 800rpx;
          .title {
            color: rgb(48, 47, 47);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 显示两行文本 */
            -webkit-box-orient: vertical;
            font-size: 28rpx;
          }

          .price {
            font-size: 38rpx;
            color: rgb(49, 154, 29);
          }
        }
      }
    }
  }
}
</style>
