<script lang="ts" setup name="LoginCallback">
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import CallbackBind from "./components/callback-bind.vue";
import CallbackPatch from "./components/callback-patch.vue";
import { ref } from "vue";
import useStore from "@/store";
import Message from "@/components/message";
import { useRouter } from "vue-router";
const hasAccount = ref(true);
const { user } = useStore();
const router = useRouter()
// 刚登录进来 需要拿到openId 将openId给到后台 后台进行判断 是否注册过
// QC.Login.signOut() 退出
// QC.Login.check() 返回布尔值 判断当前是否登录状态
// QC.Login.getMe(openId =>{ 返回唯一的标识 要求是登录状态
// })
// QC.api('get_user_info') 可以拿到头像 昵称 要求是登录状态

// 1.判断用户是否三方登录成功
const isLogin = QC.Login.check();
if (isLogin) {
  //  2.获取到openId
  QC.Login.getMe(async (openId) => {
    // console.log(openId);
    // 3.基于openId调用user模块的方法
    // 发送请求进行qq登录
    await user.qqLogin(openId);
    Message.success("登录成功");
    router.push("/");
  });
}
</script>

<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a
        href="javascript:;"
        :class="{ active: hasAccount }"
        @click="hasAccount = true"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        href="javascript:;"
        :class="{ active: !hasAccount }"
        @click="hasAccount = false"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind></CallbackBind>
    </div>
    <div class="tab-content" v-else><CallbackPatch></CallbackPatch></div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
