<template>
  <scroll-view scroll-y class="box">
    <view v-for="i in cartList">
      <uni-swipe-action>
        <uni-swipe-action-item>
          <view class="address">
            <!--  -->
            <view class="btn">
              <view class="checkboxaaa">
                <view class="yes" v-if="i.selected == true">
                  <img
                    src="../../static/icon/打勾.png"
                    style="width: 100%; height: 100%"
                  />
                </view>
              </view>
            </view>
            <!--  -->
            <view class="info">
              <view class="img">
                <img style="width: 100%; height: 100%" :src="i.pic" />
              </view>
              <view class="name">
                <view class="spuuname">{{ i.name }}</view>
                <view class="sku">{{ i.tag }}</view>
                <view class="pri">
                  <view class="pric">¥{{ i.price }}</view>
                  <view class="count">{{ i.count }}</view>
                </view>
              </view>
            </view>
          </view>
          <!-- 右侧删除按钮 -->
          <template #right>
            <view class="cart-swipe-right">
              <button class="button delete-button" @click="onDeleteCart(i.id)">
                删除
              </button>
            </view>
          </template>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </view>
  </scroll-view>
  <!--  -->
  <view class="buttom">
    <button class="btn" @click="addOrUpd(0)">添加</button>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CartList, SaveOrUpdateCart, DeleteCart } from "@/api/cart";
// 接收页面参数
onMounted(() => {
  getHas();
});

const cartList = ref([]);
let userInfo = uni.getStorageSync("userInfo");
const getHas = async () => {
  let res = await CartList({ member_id: userInfo.id });
  if (res.code == 200) {
    cartList.value = res.data.list;
  }
};

const onDeleteCart = (id) => {
  // 弹窗二次确认
  uni.showModal({
    content: "是否删除",
    confirmColor: "#27BA9B",
    success: async (res) => {
      if (res.confirm) {
        // 后端删除单品
        await DeleteCart({ id: [id] });
        // 重新获取列表
        getHas();
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 120rpx);
  background-color: rgb(237, 237, 237);
  .address {
    background-color: #fff;
    display: flex;
    height: 220rpx;
    align-items: center;
    margin: 5rpx 24rpx;
    .info {
      width: 600rpx;
      display: flex;
      margin: 5rpx;
      .img {
        width: 180rpx;
        height: 180rpx;
        margin: 10rpx;
      }
      .name {
        margin: 10rpx 0;
        width: 360rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
          font-size: 28rpx;
        }
        .pri {
          display: flex;
          justify-content: space-between;
          padding: 0 5rpx;
          .pric {
            color: rgb(55, 167, 55);
            font-size: 33rpx;
          }
          .count {
            color: rgb(112, 113, 112);
            font-size: 32rpx;
          }
        }
      }
    }
    .btn {
      width: 80rpx;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .checkboxaaa {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        border: 1rpx solid #ccc;
        margin: 0 20rpx;
        .yes {
          width: 36rpx;
          height: 36rpx;
          border-radius: 50%;
        }
      }
    }
  }
}
.buttom {
  height: 100rpx;
  width: 100%;
  background-color: rgb(255, 255, 255);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
