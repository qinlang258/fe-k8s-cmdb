<template>
  <a-layout class="layout">
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">LOGO</div>
      <left-menu />
    </a-layout-sider>
    <a-layout>
      <cus-header :collapsed="collapsed" @triggleCollapsed="triggleCollapsed" />
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
          position: 'relative',
        }"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import LeftMenu from "./LeftMenu.vue";
import CusHeader from "./CusHeader.vue";

const collapsed = ref(false);
const triggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>
<style scoped lang="less">
.layout {
  height: 100vh;
  min-height: 500px;
}
.ant-layout-sider .logo {
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.ant-layout .ant-layout-sider-background {
  background: #fff;
}
</style>
