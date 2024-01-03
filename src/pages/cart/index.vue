<template>
  <scroll-view scroll-y class="box">
    <view v-for="i in cartList">
      <uni-swipe-action>
        <uni-swipe-action-item>
          <view class="address">
            <!--  -->
            <view class="btn" @click="changStatus(i.id, i.selected, i.count)">
              <view class="checkboxaaa">
                <view class="yes" v-if="i.selected == '1'">
                  <img
                    src="../../static/icon/打勾.png"
                    style="width: 100%; height: 100%"
                  />
                </view>
              </view>
            </view>
            <!--  -->
            <navigator
              class="info"
              :url="`/pages/productInfo/index?id=${i.sku?.productId}`"
            >
              <view class="img">
                <img style="width: 100%; height: 100%" :src="i.sku?.pic" />
              </view>
              <view class="name">
                <view class="spuuname">{{ i.sku?.name }}</view>
                <view class="sku">{{ i.sku?.tag }}</view>
                <view class="pri">
                  <view class="pric">¥{{ i.sku?.price }}</view>
                  <!-- <view class="count">
                    <view class="changStatus" @click="change(1, i.count, i.id)"
                      >-</view
                    >
                    <view class="countnum">{{ i.count }}</view>
                    <view class="changStatus" @click="change(2, i.count, i.id)"
                      >+</view
                    >
                  </view> -->
                </view>
              </view>
            </navigator>
            <view class="count">
              <view
                class="changStatus"
                @click="change(1, i.count, i.id, i.selected)"
                >-</view
              >
              <view class="countnum">{{ i.count }}</view>
              <view
                class="changStatus"
                @click="change(2, i.count, i.id, i.selected)"
                >+</view
              >
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
    <view class="price">
      <view class="btn">
        <view class="checkboxaaa">
          <view class="yes" v-if="isAllSel == '1'">
            <img
              src="../../static/icon/打勾.png"
              style="width: 100%; height: 100%"
            />
          </view>
        </view>
      </view>
      <view class="pri">¥{{ totalPrice }}</view>
    </view>
    <view class="btnnn" @click="submit">提交</view>
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
let totalPrice = ref(0);
let isAllSel = ref("1");
const getHas = async () => {
  let res = await CartList({ mid: userInfo.id });
  totalPrice.value = 0;
  if (res.code == 200) {
    cartList.value = res.data.list;
    //
    for (let index = 0; index < cartList.value.length; index++) {
      if (cartList.value[index].selected == "1") {
        totalPrice.value =
          totalPrice.value +
          cartList.value[index].sku.price * cartList.value[index].count;
      }
    }
    //
    isAllSel.value = "1";
    for (let index = 0; index < cartList.value.length; index++) {
      if (cartList.value[index].selected == "0") {
        isAllSel.value = "0";
      }
    }
  }
};
//del
const onDeleteCart = (id) => {
  // 弹窗二次确认
  uni.showModal({
    content: "是否删除",
    confirmColor: "#27BA9B",
    success: async (res) => {
      if (res.confirm) {
        // 后端删除单品
        await DeleteCart({ ids: [id] });
        // 重新获取列表
        getHas();
      }
    },
  });
};
//status
const changStatus = async (id, selected, count) => {
  var sel = "0";
  if (selected == "0") {
    sel = "1";
  }
  let res = await SaveOrUpdateCart({
    id: id,
    count: count,
    selected: sel,
  });
  if (res.code == 200) {
    getHas();
  }
};
//num
const change = async (type, nowCount, id, selected) => {
  if (type == 1) {
    if (nowCount > 1) {
      let res = await SaveOrUpdateCart({
        id: id,
        count: nowCount - 1,
        selected: selected,
      });
      if (res.code == 200) {
        getHas();
      }
    }
  } else if (type == 2) {
    if (nowCount >= 1) {
      let res = await SaveOrUpdateCart({
        id: id,
        count: nowCount + 1,
        selected: selected,
      });
      if (res.code == 200) {
        getHas();
      }
    }
  }
};

const submit = () => {
  let sku = [];
  for (let index = 0; index < cartList.value.length; index++) {
    if (cartList.value[index].selected == "1") {
      sku.push({
        skuId: cartList.value[index].skuId,
        name: cartList.value[index].sku.name,
        count: cartList.value[index].count,
        price: cartList.value[index].sku.price,
        pic: cartList.value[index].sku.pic,
        sku_name_arr: cartList.value[index].tag,
      });
    }
  }
  console.log(sku);
  uni.navigateTo({
    url:
      "/pages/createOrder/index?sku=" + encodeURIComponent(JSON.stringify(sku)),
  });
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 120rpx);
  background-color: rgb(237, 237, 237);
  margin: 0 10rpx;
  .address {
    background-color: #fff;
    display: flex;
    height: 220rpx;
    align-items: center;
    margin: 5rpx 5rpx 5rpx 0rpx;
    .info {
      width: 540rpx;
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
            display: flex;
            .countnum {
              color: rgb(112, 113, 112);
              font-size: 32rpx;
              margin: 0 15rpx;
            }
            .changStatus {
              color: rgb(10, 10, 10);
              font-size: 32rpx;
            }
          }
        }
      }
    }
    .count {
      width: 120rpx;
      display: flex;
      .countnum {
        color: rgb(112, 113, 112);
        font-size: 32rpx;
        margin: 0 20rpx;
      }
      .changStatus {
        color: rgb(10, 10, 10);
        font-size: 32rpx;
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
  justify-content: space-between;
  .price {
    display: flex;
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
  .btnnn {
    width: 180rpx;
    height: 80rpx;
    border-radius: 30rpx;
    background-color: #cf4444;

    display: flex;
    align-items: center;
    justify-content: center;
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
