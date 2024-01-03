<template>
  <uni-list :border="true" v-for="i in addressList">
    <uni-swipe-action>
      <uni-swipe-action-item>
        <view class="address">
          <!--  -->
          <view class="info">
            <view class="name">
              <view>{{ i.name }}</view>
              <view class="phone">{{ i.phone }}</view>
            </view>
            <view class="addressinfo">{{ i.address }}</view>
          </view>
          <!--  -->
          <view class="btn" @click="addOrUpd(i)"> 编辑 </view>
        </view>
        <!-- 右侧删除按钮 -->
        <template #right>
          <view class="cart-swipe-right">
            <button class="button delete-button" @click="onDelete(i.id)">
              删除
            </button>
          </view>
        </template>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </uni-list>

  <!--  -->
  <view class="add">
    <button class="btn" @click="addOrUpd(0)">添加</button>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { AddressList, SaveOrUpdateAddress, DeleteAddress } from "@/api/address";
// 接收页面参数
onMounted(() => {
  getHas();
});
//
const addressList = ref([]);
let userInfo = uni.getStorageSync("userInfo");
const getHas = async () => {
  let res = await AddressList({ member_id: userInfo.id });
  if (res.code == 200) {
    addressList.value = res.data.list;
  }
};
//
const onDelete = (id) => {
  // 弹窗二次确认
  uni.showModal({
    content: "是否删除",
    confirmColor: "#27BA9B",
    success: async (res) => {
      if (res.confirm) {
        await DeleteAddress({ id: [id] });
        getHas();
      }
    },
  });
};

//
const addOrUpd = (address) => {
  uni.navigateTo({
    url: `/pages/addAddress/index?address=${address.address} &name=${address.name}&id=${address.id}&phone=${address.phone}`,
  });
};
</script>

<style lang="scss" scoped>
.address {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 220rpx;
  align-items: center;
  margin: 0 24rpx;
  .info {
    width: 540rpx;
    .name {
      display: flex;
      font-size: 31rpx;
      .phone {
        margin-left: 20rpx;
      }
    }
    .addressinfo {
      margin-top: 5rpx;
      font-size: 26rpx;
      color: #595858;
    }
  }
  .btn {
    font-size: 26rpx;
    color: #595858;
  }
}

.add {
  height: 90rpx;
  position: fixed;
  bottom: 70rpx;
  left: 0;
  width: 100%;
  .btn {
    width: 60%;
    height: 100%;
    background-color: rgba(48, 182, 36, 0.744);
    color: white;
  }
}

.cart-swipe-right {
  display: flex;
  height: 100%;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    padding: 6px;
    line-height: 1.5;
    color: #fff;
    font-size: 26rpx;
    border-radius: 0;
  }

  .delete-button {
    background-color: #cf4444;
  }
}
</style>
