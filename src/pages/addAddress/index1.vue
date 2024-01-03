<template>
  <view class="example">
    <uni-forms ref="baseForm" :modelValue="baseFormData">
      <uni-forms-item label="标题">
        <uni-easyinput v-model="baseFormData.title" placeholder="请输入标题" />
      </uni-forms-item>
      <uni-forms-item label="内容">
        <uni-easyinput
          type="textarea"
          v-model="baseFormData.content"
          placeholder="请输入内容"
        />
      </uni-forms-item>
      <uni-forms-item label="封面地址">
        <uni-easyinput
          v-model="baseFormData.pic"
          placeholder="请输入封面地址"
        />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="addArt">提交</button>
  </view>
</template>

<script setup>
import { SaveOrUpdateAddress } from "@/api/address";
import { reactive, ref, onMounted } from "vue";
// const { address } = defineProps(["address"]);
const { id } = defineProps({ id });
onMounted(() => {
  console.log(id);
});
const baseFormData = reactive({
  title: "",
  content: "",
  pic: "",
  member_id: 0,
});
//
let userInfo = uni.getStorageSync("userInfo");
const addArt = async () => {
  baseFormData.member_id = userInfo.id;
  let res = await SaveOrUpdateAddress(baseFormData);
  if (res.code == 200) {
    uni.reLaunch({
      url: "/pages/community/index",
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
