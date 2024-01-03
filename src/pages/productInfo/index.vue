<template>
  <view class="box">
    <scroll-view class="content" scroll-y>
      <swiper
        class="swiper"
        circular
        :indicator-dots="true"
        :autoplay="true"
        :interval="2000"
        :duration="500"
      >
        <swiper-item v-for="i in spu.img">
          <img class="img" :src="i.url" />
        </swiper-item>
      </swiper>
      <view class="info">
        <view class="price">¥{{ spu.price }}</view>
        <view class="name">{{ spu.name }}</view>
        <view class="desc">{{ spu.desc }}</view>
      </view>
      <!--  -->
      <view class="xq">
        <view class="h2">---详情介绍---</view>
        <view class="images">
          <img
            v-for="i in spu.detailImg"
            style="width: 100%"
            :src="i.url"
            alt=""
          />
        </view>
      </view>
      <!--  -->
      <view class="btn">
        <navigator url="/pages/cart/index" open-type="navigate">
          <uni-icons type="cart" size="42"></uni-icons>
        </navigator>
        <view @tap="openSkuPopup(2)" class="addcart"> 加入购物车 </view>
        <view @tap="openSkuPopup(3)" class="payment"> 立即购买 </view>
      </view>
    </scroll-view>
  </view>

  <!--  -->
  <vk-data-goods-sku-popup
    class="sku"
    ref="skuPopup"
    v-model="skuKey"
    border-radius="20"
    :localdata="localdata"
    :mode="skuMode"
    @open="onOpenSkuPopup"
    @close="SkuPopup"
    @add-cart="addCart"
    @buy-now="buyNow"
  ></vk-data-goods-sku-popup>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { productInfo } from "@/api/index";
import { CartList, SaveOrUpdateCart, DeleteCart } from "@/api/cart";
// 接收页面参数
const { id } = defineProps(["id"]);
onMounted(() => {
  getHas();
});
//
const spu = ref();
const cartList = ref([]);
const cartLength = ref(0);
let userInfo = uni.getStorageSync("userInfo");

// 商品信息
const localdata = ref({});
let skul = ref([]);
const result = [];
const getHas = async () => {
  let res = await productInfo({ id: parseInt(id) });
  if (res.code == 200) {
    spu.value = res.data;
    //
    for (let index = 0; index < spu.value.sku.length; index++) {
      const result = Object.values(JSON.parse(spu.value.sku[index].tag)).map(
        (value) => value.trim()
      );
      spu.value.sku[index].sku_name_arr = result;
      skul.value.push(spu.value.sku[index].tag);
    }
  }
  //
  skul.value.forEach((input) => {
    const item = JSON.parse(input);
    for (let key in item) {
      const value = item[key];
      const existingProperty = result.find((prop) => prop.name === key);
      if (existingProperty) {
        const existingValue = existingProperty.list.find(
          (val) => val.name === value
        );
        if (!existingValue) {
          existingProperty.list.push({ name: value });
        }
      } else {
        result.push({ name: key, list: [{ name: value }] });
      }
    }
  });
  //
  localdata.value = {
    _id: spu.value.id,
    name: spu.value.name,
    goods_thumb: spu.value.pic,
    spec_list: result,
    sku_list: spu.value.sku.map((v) => {
      return {
        _id: v.id,
        goods_id: v.product_id,
        goods_name: v.name,
        image: v.pic,
        price: v.price * 100, // 注意：需要乘以 100
        stock: v.stock,
        sku_name_arr: v.sku_name_arr,
      };
    }),
  };
  //
  let res1 = await CartList({ member_id: userInfo.id });
  if (res.code == 200) {
    cartList.value = res1.data.list;
    cartLength.value = res1.data.list.length;
  }
};
//

//
const skuKey = ref(false);
const skuMode = ref(1);
const goodsInfo = ref({});

const openSkuPopup = (val) => {
  skuMode.value = val;
  skuKey.value = true;
};

const onOpenSkuPopup = () => {
  console.log("监听 - 打开sku组件");
};

const SkuPopup = () => {
  console.log("监听 - 关闭sku组件");
};
//
const addCart = async (ev) => {
  let res = await SaveOrUpdateCart({
    id: 0,
    mid: userInfo.id,
    skuId: ev._id,
    count: ev.buy_num,
    selected: 0,
  });
  if (res.code === 200) {
    uni.showToast({ title: "添加成功" });
    skuKey.value = false;
  } else {
    uni.showToast({ title: "添加失败" });
  }
};

const buyNow = (ev) => {
  let sku = [];
  sku.push({
    skuId: ev._id,
    name: ev.goods_name,
    count: ev.buy_num,
    price: ev.price / 100,
    pic: ev.image,
    sku_name_arr: ev.sku_name_arr,
  });
  uni.navigateTo({
    url:
      "/pages/createOrder/index?sku=" + encodeURIComponent(JSON.stringify(sku)),
  });
};

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
</script>

<style lang="scss">
.box {
  .content {
    height: calc(100vh - 110rpx);
    padding: 0 0 110rpx 0;
    .swiper {
      //height: 340rpx;
      height: 600rpx;
      width: 100%;
      position: relative;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      .price {
        font-size: 46rpx;
        color: rgb(41, 195, 17);
        display: flex;
        align-items: center;
        padding: 20rpx 0 0 30rpx;
      }
      .name {
        font-size: 32rpx;
        color: rgb(22, 22, 22);
        margin: 20rpx;
        font-weight: bold;
      }
      .desc {
        font-size: 30rpx;
        color: rgb(140, 139, 139);
        margin: 20rpx;
      }
    }
    .xq {
      .h2 {
        text-align: center;
        font-size: 32rpx;
        color: rgb(119, 117, 115);
      }
      .images {
        margin-top: 10rpx;
        width: 100%;
      }
    }
  }

  .btn {
    display: flex;
    height: 110rpx;
    position: fixed;
    bottom: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 10rpx;
    & > view {
      margin: 0 10rpx;
      width: 280rpx;
      height: 80rpx;
      text-align: center;
      font-size: 34rpx;
      text-align: center;
      line-height: 90rpx;
      color: #fff;
      border-radius: 42rpx;
    }
    .addcart {
      background-color: #ffa868;
    }

    .payment {
      background-color: #27ba9b;
    }
  }
}
</style>
