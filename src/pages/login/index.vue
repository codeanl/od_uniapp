<template>
  <view class="box">
    <!-- logo -->
    <view class="logo">
      <img
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
        class="img"
      />
    </view>
    <!--  -->
    <view class="login">
      <uni-forms :modelValue="formData">
        <uni-forms-item label="用户名" name="phone">
          <uni-easyinput
            type="text"
            v-model="formData.phone"
            placeholder="请输入用户名"
          />
        </uni-forms-item>
        <uni-forms-item label="密码" name="password">
          <uni-easyinput
            type="password"
            v-model="formData.password"
            placeholder="请输入密码"
          />
        </uni-forms-item>
      </uni-forms>
      <button @click="login" class="btn">登录</button>
    </view>

    <!--  -->
    <view class="dd">
      <span class="p">--------其他登录方式--------</span>
      <view class="list">
        <view class="iconinfo">
          <uni-icons type="contact" size="45" class="icon"></uni-icons>
          <span class="p">快捷登录</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";
import { MemberLogin } from "@/api/login";
const formData = reactive({
  phone: "123456",
  password: "123456",
});
//
// import { useMemberStore } from "@/store";
const login = async () => {
  let res = await MemberLogin(formData);
  if (res.code == 200) {
    // 存储个人信息
    uni.setStorageSync("userInfo", res.data);
    uni.reLaunch({ url: "/pages/my/index" });
  }
};
</script>

<style lang="scss">
.box {
  //background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  .logo {
    text-align: center;
    .img {
      width: 180rpx;
      height: 180rpx;
    }
  }
  .login {
    margin-top: 40rpx;
    .btn {
      background-color: rgb(109, 214, 57);
      border-radius: 100rpx;
      height: 74rpx;
    }
  }
  .dd {
    margin-top: 50rpx;
    text-align: center;
    .p {
      font-size: 24rpx;
      color: #9d9b9b;
    }
    .list {
      display: flex;
      text-align: center;
      justify-content: center;
      .iconinfo {
        width: 100rpx;
        margin: 0 5rpx;
        .p {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
