<template>
  <view class="box">
    <rich-text class="richTextContent" :nodes="info.content"></rich-text>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ArticleInfo } from "@/api/article";
// 接收页面参数
const { id } = defineProps(["id"]);
onMounted(() => {
  getHas();
});
const info = ref();
const getHas = async () => {
  console.log(id);
  let res = await ArticleInfo({ id: id });
  if (res.code == 200) {
    info.value = res.data;
  }
};
</script>

<style lang="scss">
.box {
  margin: auto;
  margin: 0 30rpx;
}
</style>
