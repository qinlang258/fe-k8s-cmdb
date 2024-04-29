<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="cus-header">
      <div class="cus-header_icon">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleCollasped"
        />
        <menu-fold-outlined v-else class="trigger" @click="handleCollasped" />
      </div>
      <div class="cus-header_user">
        <span>欢迎! {{ username }} </span>
        <span class="logout" @click="toLogout">[ 登出 ]</span>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { removeStorage, getStorage } from "@/utils";

//const username = ref(getStorage("name"));
const username = getStorage("name");
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const { collapsed } = toRefs(props);
const emit = defineEmits(["triggleCollapsed"]);
const handleCollasped = () => {
  emit("triggleCollapsed");
};

const router = useRouter();
const toLogout = () => {
  removeStorage("token");
  removeStorage("email");
  removeStorage("name");
  removeStorage("roles");
  message.success("已退出");
  router.replace("/login");
};
</script>

<style scoped lang="less">
.cus-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cus-header_user {
    padding-right: 24px;
    span {
      &:first-of-type {
        font-weight: 800;
      }
    }
    .logout {
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
