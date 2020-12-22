<template>
  <div class="hello">
    <div class="container">
      <div class="main">
        <a-form
          id="formLogin"
          class="user-layout-login"
          ref="formLogin"
          :form="form"
          @submit="handleSubmit"
        >
          <a-tabs
            :activeKey="customActiveKey"
            :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
          >
            <a-tab-pane key="tab1" tab="xx公司后台管理系统">
              <a-alert
                v-if="isLoginError"
                type="error"
                showIcon
                style="margin-bottom: 24px;"
                message="账户或密码错误（admin/ant.design )"
              />
              <a-form-item>
                <a-input
                  size="large"
                  type="text"
                  placeholder="账户: admin"
                  v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'change'}
              ]"
                >
                  <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input-password
                  size="large"
                  placeholder="密码: 987654321"
                  v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
                >
                  <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                </a-input-password>
              </a-form-item>
            </a-tab-pane>
           
          </a-tabs>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="state.loginBtn"
              :disabled="state.loginBtn"
            >确定</a-button>
          </a-form-item>
        </a-form>
 
      </div>
    </div>
  </div>
</template>

<script>
import { apiAddress, apiLogin } from "@/request/api"; // 导入我们的api接口
import axios from "axios";
import Qs from "qs";
export default {
  name: "",
  props: {
    msg: String
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  mounted: function() {
    

  },
  methods: {
    handleOkClick() {
      console.log(this.$form.createForm);
      console.log("**************");
      const param = {
        key: "amdin",
        pw: "123456"
      };
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          const param = {
            key: values.username,
            pw: values.password
          };
          apiLogin(param).then(res => {
            if (res.state == 0) {
              localStorage.setItem("admin",res.userName)
              this.$router.push("/Authority/UserList");
            }
            else{
                  this.$message.error('密码错误，请从新登陆！');
            }
          });
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background: #f0f2f5 url(~@/assets/images/background.svg) no-repeat 50%; */

  position: relative;

  background: url(~@/assets/images/logo01.jpg) no-repeat;
  background-size: 100% 100%;
  justify-content: center; /*子元素水平居中*/
  align-items: center; /*子元素垂直居中*/
  display: flex;
  .main {
    // width: 100%;
    // height: 100%;
    background: #ffffff;
    padding: 20px;
  }
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
}
</style>
