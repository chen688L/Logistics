<template>
  <!-- 父盒子 -->
  <div class="body">
    <!-- 子盒子 -->
    <div class="main">
      <!-- 登录盒子 -->
      <div class="login-con">
        <!-- 切换按钮 -->
        <ul class="menu-tab">
          <li
            v-for="(v, i) in menu"
            :class="{ current: v.current }"
            :key="i"
            @click="clickMenu(v)"
          >
            {{ v.txt }}
          </li>
        </ul>
        <!-- 表单输入框 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <label>账号：</label>
            <el-input
              v-model="ruleForm.name"
              type="text"
              autocomplete="off"
              placeholder="admin"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <label>密码：</label>
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              placeholder="admin123456"
            />
          </el-form-item>
          <el-form-item prop="pass" v-show="model==='register'">
            <label>重复密码：</label>
            <el-input
              v-model="ruleForm.password2"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn block" type="primary" @click="submitForm(ruleFormRef)"
              >{{ model==="login"?"Sign in":"Sign up" }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
//引入
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import link from "../api/Link.js";
import apiUrl from "../api/url.js";

import useMd5 from "../hook/index.js"

import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
let router=useRouter()
/**
 * 登录注册切换功能模块
 */
//定义一个登录和注册切换的对象
const menu = reactive([
  { txt: "登录",current: true, type: "login",},
  { txt: "注册",current: false,type: "register",},
]);
//判断是登录还是注册的对象
let model = ref("login")
//定义切换登录还是注册的方法
let clickMenu = (item: any) => {
  // 点击之后状态全部都为false
  menu.forEach((elemt) => {
    elemt.current = false;
  });
  // 当前对象为点击对象，显示高亮
  item.current = true;
  //判断是登录还是注册
  model.value = item.type

};

/**
 * 登录注册表单处理
 */
// 表单验证
const ruleFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } 
  // else if(ck.CkEmail(value)){
  //   callback(new Error("密码为6~12位"));
  // } 
  else {
    callback()
  }
};

// 表单 账号密码
const ruleForm = reactive({
  name: "admin",
  password: "admin123",
  password2: "",
});
//失去焦点验证表单
const rules = reactive<FormRules>({
  password: [{ validator: validatePass, trigger: "blur" }],
  password2: [{ validator: validatePass, trigger: "blur" }],
});

// 登录接口判断
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (model.value === "login") {
        router.push("/home")
      } else {
        link(apiUrl.register,"get",{},{
          name:ruleForm.name,pwd:useMd5(ruleForm.password).value})
          .then((ok:any)=>{
            router.push("/home")
            if(ok.data.length!=0){
              console.log("登陆成功")

              router.push("/home")
            }else{
              console.log("登录失败")
            }
          })
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

</script>
<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;
}

.main {
  position: relative; //相对定位
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: rgba(123, 123, 165, 0.7);
  box-shadow: 10px 10px 10px #d5d8dc, -10px -10px 10px #dddce4;
  border-radius: 20px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 2s linear;
}
// .main:hover{
//   transform: rotate(180deg);
//   -webkit-transform: rotateY(180deg);
// }

// 媒体查询
@media (max-width: 1200px) {
  .main {
    transform: scale(0.7);
  }
}
@media (max-width: 1000px) {
  .main {
    transform: scale(0.6);
  }
}
@media (max-width: 800px) {
  .main {
    transform: scale(0.5);
  }
}
@media (max-width: 600px) {
  .main {
    transform: scale(0.4);
  }
}
.login-con {
  width: 70%;
  border-radius: 20px;
  margin: 10px auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.demo-ruleForm {
  width: 50%;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>