<template>
  <view>
    <!--  -->
    <view class="top">
      <view class="itemList">
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="#007aff"
          @clickItem="onClickItem"
        />
      </view>
    </view>

    <!--  -->
    <!-- <view class="search">
      <uni-search-bar
        @confirm="search"
        :focus="false"
        v-model="searchValue"
        @blur="blur"
        @input="input"
        @cancel="cancel"
        @clear="clear"
        bgColor="#EEEEEE"
        placeholder="搜索"
      >
      </uni-search-bar>
    </view> -->
    <!--  -->
    <view class="content">
      <view class="artical left">
        <navigator
          class="articalcontent"
          v-for="(i, index) in leftData"
          :url="`/pages/articalInfo/index?id=${i.id}`"
        >
          <view class="img">
            <img style="width: 330rpx; height: 330rpx" :src="i.pic" />
          </view>
          <view class="title">{{ i.title }}</view>
          <view class="user">
            <view class="userinfo">
              <img style="width: 50rpx; height: 50rpx" :src="i.member.avatar" />
              <view class="username">{{ i.member.nickname }}</view>
            </view>
            <view class="zan">111</view>

            <view class="btn" v-if="current == 2">
              <uni-icons
                type="trash"
                size="24"
                class="icon"
                @click="deleteArt(i.id)"
              ></uni-icons>
              <uni-icons
                type="eye"
                size="24"
                class="icon"
                @click="updArt(i.id, i.title, i.content, i.pic)"
              ></uni-icons>
            </view>
          </view>
        </navigator>
      </view>
      <view class="artical right">
        <navigator
          class="articalcontent"
          v-for="(i, index) in rightData"
          :url="`/pages/articalInfo/index?id=${i.id}`"
        >
          <view class="img">
            <img style="width: 330rpx; height: 330rpx" :src="i?.pic" />
          </view>
          <view class="title">{{ i.title }}</view>
          <view class="user">
            <view class="userinfo">
              <img style="width: 50rpx; height: 50rpx" :src="i.member.avatar" />
              <view class="username">{{ i.member.nickname }}</view>
            </view>
            <view class="zan">111</view>

            <view class="btn" v-if="current == 2">
              <uni-icons
                type="trash"
                size="24"
                class="icon"
                @click="deleteArt(i.id)"
              ></uni-icons>
              <uni-icons
                type="eye"
                size="24"
                class="icon"
                @click="updArt(i.id, i.title, i.content, i.pic)"
              ></uni-icons>
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </view>

  <uni-fab
    :horizontal="horizontal"
    :direction="direction"
    @fabClick="fabClick"
  />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { ArticleList, SaveOrUpdateArticle, DeleteArticle } from "@/api/article";
const horizontal = ref("right");
const direction = ref("vertical");
//
const fabClick = () => {
  uni.navigateTo({
    url: "/pages/addArticle/index",
  });
};
const updArt = (id, title, content, pic) => {
  uni.navigateTo({
    url: `/pages/addArticle/index?id=${id} &title=${title}&content=${content}&pic=${pic}`,
  });
};
// 接收页面参数
onMounted(() => {
  getHas();
});

//
const items = ["推荐", "最新", "我的"];
const current = ref(0);
const onClickItem = (e) => {
  if (current !== e.currentIndex) {
    current.value = e.currentIndex;
  }
  getHas();
};

//
const articleList = ref([]);
const leftData = ref([]);
const rightData = ref([]);
let userInfo = uni.getStorageSync("userInfo");
const getHas = async () => {
  let member_id = 0;
  if (current.value == 2) {
    member_id = userInfo.id;
  }
  let res = await ArticleList({
    sortType: current.value,
    memberId: member_id,
  });
  if (res.code == 200) {
    articleList.value = res.data.list;
    //
    leftData.value = res.data.list.filter((item, index) => index % 2 === 0);
    rightData.value = res.data.list.filter((item, index) => index % 2 !== 0);
  }
  console.log(articleList.value);
};

const deleteArt = (id) => {
  console.log(id);
  // 弹窗二次确认
  uni.showModal({
    content: "是否删除",
    confirmColor: "#27BA9B",
    success: async (res) => {
      if (res.confirm) {
        await DeleteArticle({ ids: [id] });
        getHas();
      }
    },
  });
};
</script>

<style lang="scss">
.top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background-color: white;
  .itemList {
    width: 450rpx;
    height: 85rpx;
    //background-color: aqua;
    //padding: 0px 30px;
  }
}
.search {
  margin-top: 85rpx;
}
.content {
  display: flex;
  justify-content: space-between;
  margin: 0 30rpx;
  margin-top: 75rpx;
  .artical {
    width: 330rpx;
    .btn {
      position: absolute;
      top: 10rpx;
      right: 10rpx;
      .icon {
        margin: 0 2rpx;
      }
    }
    .articalcontent {
      position: relative;
      margin-top: 20rpx;
      width: 100%;
      display: grid;
      .img {
        width: 100%;
      }
      .title {
        font-size: 30rpx;
        color: #282828;
        margin-left: 15rpx;
      }
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10rpx;

        .userinfo {
          display: flex;
          .username {
            font-size: 28rpx;
            margin-left: 5rpx;
            color: #505050;
          }
        }
        .zan {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }
}

.content-text {
  font-size: 14px;
  color: #666;
}
</style>
