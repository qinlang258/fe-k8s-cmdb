<template>
  <a-menu :selected-keys="selectedKeys" theme="dark" mode="inline">
    <template v-for="item in menuList">
      <a-menu-item
        :key="item.key"
        v-if="!item.children"
        @click="handleHighlight(item)"
      >
        <router-link :to="item.path" class="menu-link">
          <component :is="item.icon || 'radar-chart-outlined'" />
          <span>&nbsp;&nbsp;{{ item.name }}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu v-else :key="'submenu-' + generateSubMenuKey(item)">
        <template #title>
          <component :is="item.icon || 'radar-chart-outlined'" />
          <span>&nbsp;&nbsp;{{ item.name }}</span>
        </template>
        <a-menu-item
          v-for="child in item.children"
          :key="child.key"
          @click="handleHighlight(child)"
        >
          <router-link :to="child.path" class="menu-link">
            {{ child.name }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import menuList from "@/utils/menu";

const router = useRouter();
const selectedKeys = ref([]);

const handleHighlight = (item) => {
  selectedKeys.value = [item.key];
};

const generateSubMenuKey = (item) => {
  return `submenu-${item.key}`;
};

watch(
  () => router.currentRoute.value.path,
  async () => {
    await router.isReady();
    selectedKeys.value = [router.currentRoute.value.name];
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.menu-link {
  > span {
    &:first-of-type {
      font-size: 16px;
    }
  }
}
</style>
