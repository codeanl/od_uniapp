<template>
  <scroll-view class="trs" scroll-y>
    <!-- <view class="address">
      <view class="icon"
        ><uni-icons type="navigate-filled" size="36"></uni-icons
      ></view>
      <view class="info">
        <view class="name">
          <view class="nname">廖佳安</view>
          <view class="phone">15678042170</view>
        </view>
        <view class="addressInfo">广西壮族自治区柳州市</view>
      </view>
    </view> -->
    <!--  -->
    <view class="pro">
      <view class="product" v-for="i in skuData">
        <view class="img">
          <img style="width: 100%; height: 100%" :src="i.pic" alt="" />
        </view>
        <view class="name">
          <view class="spuuname">{{ i.name }}</view>
          <view class="sku">{{ i.sku_name_arr }}</view>
          <view class="price">
            <view class="pri">¥{{ i.price }}</view>
            <view class="count">x{{ i.count }}</view>
          </view>
        </view>
      </view>
    </view>
    <!--  -->
    <view class="form">
      <uni-forms :modelValue="baseFormData">
        <uni-forms-item label="配送">
          <uni-data-checkbox
            v-model="baseFormData.order_type"
            :localdata="order_type"
          />
        </uni-forms-item>
        <uni-forms-item label="时间">
          <uni-datetime-picker
            type="datetime"
            v-model="baseFormData.datetimesingle"
          />
        </uni-forms-item>
        <uni-forms-item label="姓名">
          <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="号码">
          <uni-easyinput
            v-model="baseFormData.phone"
            placeholder="请输入号码"
          />
        </uni-forms-item>
        <uni-forms-item label="地址">
          <uni-easyinput
            v-model="baseFormData.address"
            placeholder="请输入地址"
          />
        </uni-forms-item>
        <uni-forms-item label="备注">
          <uni-easyinput v-model="baseFormData.note" placeholder="请输入备注" />
        </uni-forms-item>
      </uni-forms>
    </view>
  </scroll-view>
  <!--  -->
  <view class="buttom">
    <view class="price">¥{{ price }}</view>
    <view class="btn" @click="submit">提交</view>
  </view>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { AddOrder } from "@/api/order";
const props = defineProps({
  sku: {
    default: "",
  },
});
onMounted(() => {
  getHas();
});
//
const skuData = ref({});
const price = ref(0);
const getHas = () => {
  skuData.value = JSON.parse(props.sku);
  price.value = skuData.value.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.count,
    0
  );
};
//
const baseFormData = reactive({
  order_type: "0",
  datetimesingle: Date.now(),
  note: "",
  name: "",
  phone: "",
  address: "",
});
const order_type = [
  {
    text: "到店自提",
    value: "0",
  },
  {
    text: "送货上门",
    value: "1",
  },
];
//
let userInfo = uni.getStorageSync("userInfo");
//将时间戳和随机数拼接为订单号
let generateOrderNumber = () => {
  const prefix = "ORD"; // 订单号前缀
  const randomLength = 4; // 随机数长度
  const timestamp = Date.now(); // 当前时间戳
  // 生成随机数
  const random = Math.floor(
    Math.random() * Math.pow(10, randomLength)
  ).toString();
  // 将时间戳和随机数拼接为订单号
  const orderNumber = prefix + timestamp.toString() + random;
  return orderNumber;
};
//
const submit = async () => {
  const data = {
    mid: userInfo.id,
    orderSn: generateOrderNumber(),
    pledgeAmount: 0, //
    freightAmount: 0, //
    totalAmount: price.value,
    bookedTime: timeTime(baseFormData.datetimesingle),
    name: baseFormData.name, //
    phone: baseFormData.phone, //
    address: baseFormData.address, //
    orderType: baseFormData.order_type,
    payType: "0",
    status: "1",
    note: baseFormData.note,
    sku: skuData.value,
  };
  console.log(price.value);
  const res = await AddOrder(data);
  if (res.code == 200) {
    uni.navigateTo({
      url: "/pages/orderOk/index",
    });
  }
};
//
function timeTime(params) {
  if (!params) {
    var dateTime = new Date();
  } else {
    var dateTime = new Date(params);
  }
  var dateTimeString = dateTime.toISOString();
  return dateTimeString;
}
</script>

<style lang="scss">
.trs {
  background-color: rgb(243, 243, 243);
  height: calc(100vh - 120rpx);
  padding: 0 20rpx;
  padding-top: 30rpx;
  .address {
    width: 100%;
    border-radius: 40rpx;
    height: 110rpx;
    display: flex;
    background-color: #ffffff;
    .icon {
      width: 90rpx;
      align-items: center;
    }
    .info {
      margin-left: 10rpx;
      display: grid;
      place-items: center;
      .name {
        display: flex;
        .nname {
          font-size: 34rpx;
          color: #1d1d1d;
        }
        .phone {
          margin-left: 10rpx;
          font-size: 34rpx;
          color: #575757;
        }
      }
      .addressInfo {
        font-size: 32rpx;
        color: #414141;
      }
    }
  }
  .pro {
    margin-top: 23rpx;
    margin-bottom: 25rpx;
    background-color: rgb(255, 255, 255);
    .product {
      display: flex;

      .img {
        width: 180rpx;
        height: 180rpx;
        margin-left: 10rpx;
      }
      .name {
        width: 470rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10rpx 10rpx;
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
          font-size: 30rpx;
        }
        .price {
          display: flex;
          justify-content: space-between;
          .pri {
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
  }
}
.form {
  padding: 35rpx;
  background-color: #ffffff;
}
.buttom {
  height: 120rpx;

  width: 100%;
  background-color: rgb(255, 255, 255);
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  .price {
    margin-left: 30rpx;
    font-size: 38rpx;
    line-height: 80rpx;
    color: rgb(114, 183, 160);
  }
  .btn {
    margin-right: 30rpx;
    width: 180rpx;
    height: 80rpx;
    border-radius: 30rpx;
    background-color: rgb(108, 226, 76);
    text-align: center;
    font-size: 34rpx;
    line-height: 80rpx;
  }
}
</style>
