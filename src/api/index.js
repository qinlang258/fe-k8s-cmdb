import axios from "axios";
import { message } from "ant-design-vue";
import { getStorage, removeStorage } from "@/utils";
import router from "@/router";

axios.interceptors.request.use(
  (req) => {
    req.headers.authorization = getStorage("token");
    if (!req.data) {
      req.data = {};
    }
    if (req.url.indexOf("http") === -1) {
      req.url = import.meta.env.VUE_APP_BASE_URL + req.url;
    }
    return req;
  },
  (err) => Promise.reject(err)
);

let unLoginFlag = true;
// http response 拦截器
axios.interceptors.response.use(
  (res) => {
    if (res.config.responseType !== "arraybuffer") {
      const SUCCESS = 200; // 成功
      const NO_LOGIN = 401; // 登录失效
      switch (res.data.code) {
        case SUCCESS: // 成功
          return res.data;
        case NO_LOGIN: // 登录失效
          res.data.failed = true;
          if (unLoginFlag) {
            unLoginFlag = false;
            message.error("登录信息失效，请重新登录");
            setTimeout(() => {
              unLoginFlag = true;
            }, 500);
          }
          removeStorage("token");
          router.push("/login");
          return res.data;
        default:
          if (unLoginFlag) {
            message.error(res.data.msg);
          }
          res.data.failed = true;
          return res.data;
      }
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    message.error("网络错误，请稍后重试");
    Promise.reject(error.response.data);
  }
);