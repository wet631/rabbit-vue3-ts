<script lang="ts" setup name="LoginForm">
import { ref } from "vue";
import useStore from "@/store/index";
import Message from "@/components/message";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { watch } from "vue";
import { useCountDown } from "@/utils/hooks";
import {
  accountRule,
  mobileRule,
  codeRule,
  passwordRule,
  isAgreeRule
} from '@/utils/validate'
const type = ref<"account" | "mobile">("account");
const { user } = useStore();

const form = ref({
  account: "",
  password: "",
  isAgree: false,
});

const router = useRouter();

const { validate, resetForm } = useForm({
  // 设置校验规则
  validationSchema: {
    account: accountRule,
    mobile: mobileRule,
    code: codeRule,
    password: passwordRule,
    isAgree: isAgreeRule
  },
  initialValues: {
    mobile: "13666666666",
    code: "123456",
    account: "xiaotuxian001",
    password: "123456",
    isAgree: true,
  },
});
// value 用于和表单绑定的响应式数据
// errorMessage 错误信息提示 用于实时展示
const { value: account, errorMessage: accountError } =
  useField<string>("account");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: isAgree, errorMessage: isAgreeError } =
  useField<boolean>("isAgree");
const {
  value: mobile,
  errorMessage: mobileError,
  validate: validateMobile,
} = useField<string>("mobile");
const { value: code, errorMessage: codeError } = useField<string>("code");

const login = async () => {
  // 登陆前进行校验
  const res = await validate();

  if (type.value === "account") {
    // 如果表单校验通过
    if (res.errors.account || res.errors.password || res.errors.isAgree) return;
    await user.login(account.value, password.value);
  } else {
    if (res.errors.mobile || res.errors.code || res.errors.isAgree) return;
    await user.mobileLogin(mobile.value, code.value);
  }
  Message.success("登录成功");
  router.push("/");
};

// 监听type的变化
watch(type, () => {
  // 重置表单
  resetForm();
});

// 点击校验，发送验证码 当手机号不正确的时候 focus输入框
const mobileRef = ref<HTMLInputElement | null>(null);

const { time, resume } = useCountDown();

const send = async () => {
  // 当在倒计时的过程中 不让send被重复点击的
  if (time.value > 0) return;
  // 校验手机号
  const res = await validateMobile();
  if (!res.valid) {
    // 如果没通过，自动获取手机号的焦点
    mobileRef.value!.focus();
    return;
  }
  await user.sendMobileMsg(mobile.value);
  Message.success("获取验证码成功");

  // 开启倒计时
  time.value = 60;
  resume();
};
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" @click="type = 'account'" v-if="type === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="type = 'mobile'" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              v-model="account"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="accountError">
            <i class="iconfont icon-warning" />{{ accountError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="passwordError">
            <i class="iconfont icon-warning" />{{ passwordError }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              v-model="mobile"
              ref="mobileRef"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="mobileError">
            <i class="iconfont icon-warning" />{{ mobileError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="text" v-model="code" placeholder="请输入验证码" />
            <span class="code" @click="send">
              {{ time === 0 ? "发送验证码" : `${time}s后发送` }}</span
            >
          </div>
          <div class="error" v-if="codeError">
            <i class="iconfont icon-warning" />{{ codeError }}
          </div>
        </div>
      </template>

      <div class="form-item">
        <div class="agree">
          <XtxCheckbox v-model="isAgree"></XtxCheckbox>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeError">
          <i class="iconfont icon-warning" />{{ isAgreeError }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
        ><img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="QQ登录"
          border="0"
      /></a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
