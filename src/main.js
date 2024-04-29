import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import moment from "moment";
import "moment/locale/zh-cn";
import '@/api'
//import '@/styles/common.scss'




const app = createApp(App)

app.use(createPinia())
app.use(router)
moment.locale("zh-cn");


const icons = Icons
for (const i in icons) {
  app.component(i, icons[i])
}

Object.keys(Icons).map((key) => {
    app.component(key, Icons[key]);
  });

app.use(Antd).mount('#app')