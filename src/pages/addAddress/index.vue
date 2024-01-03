<template>
  <view class="example">
    <uni-forms ref="baseForm" :modelValue="form">
      <uni-forms-item label="姓名">
        <uni-easyinput v-model="form.name" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="手机">
        <uni-easyinput v-model="form.phone" placeholder="请输入手机" />
      </uni-forms-item>
      <uni-forms-item label="地址">
        <uni-easyinput v-model="form.address" placeholder="请输入地址" />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="addOrUpd">提交</button>
  </view>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { SaveOrUpdateAddress } from "@/api/address";
const props = defineProps({
  address: {
    default: "",
  },
  name: {
    default: "",
  },
  phone: {
    default: "",
  },
  id: {
    default: "",
  },
});
const form = reactive({
  id: 0,
  name: "",
  phone: "",
  address: "",
});
onMounted(() => {
  getHas();
});

//
const getHas = () => {
  if (props.id > 0) {
    form.id = parseInt(props.id);
    form.name = props.name;
    form.phone = props.phone;
    form.address = props.address;
  }
};

//
let userInfo = uni.getStorageSync("userInfo");
const addOrUpd = async () => {
  form.member_id = userInfo.id;
  let res = await SaveOrUpdateAddress(form);
  if (res.code == 200) {
    uni.navigateTo({
      url: "/pages/address/index",
    });
  }
};
</script>

<style lang="scss">
.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
</style>
