<template>
  <view>
    <uni-search-bar
      @confirm="search"
      :focus="true"
      v-model="searchValue"
      placeholder="搜索"
    >
    </uni-search-bar>
  </view>
</template>

<script setup>
import { ref } from "vue";
const searchValue = ref("");
const search = (res) => {
  uni.navigateTo({
    url: `/pages/searchList/index?name=${searchValue.value}`,
  });
};
</script>
<style lang="scss"></style>
