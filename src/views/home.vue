<template>
  <div class="page-container">
    <div class="env-select">
      <a-menu
        mode="horizontal"
        :default-selected-keys="['prod']"
        @click="handleMenuClick($event.key)"
        style="width: 100%"
      >
        <a-menu-item
          key="prod"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div
            :style="{
              width: '10px',
              height: '30px',
              borderRadius: '20px',
              background: 'var(--color-fill-3)',
              cursor: 'text',
              marginLeft: 'auto',
            }"
          />
        </a-menu-item>
        <a-menu-item key="prod">Prod环境</a-menu-item>
        <a-menu-item key="qa">Qa环境</a-menu-item>
      </a-menu>
    </div>
    <div class="cards-list">
      <a-popover
        v-for="card in cardsData"
        :key="card.Id"
        :content="card.Url"
        placement="bottom"
      >
        <a-card
          hoverable
          :style="{ width: '200px' }"
          @click="goToCardPath(card.Url)"
          @mouseover="showCardUrl(card.Url)"
          @mouseout="hideCardUrl"
        >
          <template #cover>
            <div
              :style="{
                height: '100px',
                overflow: 'hidden',
              }"
            >
              <img :style="{ width: '100%' }" alt="dessert" :src="card.Path" />
            </div>
          </template>
          <a-card-meta :title="card.Title" :description="card.Description">
            <template #card.Description></template>
          </a-card-meta>
        </a-card>
      </a-popover>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { List } from "@/api/portal";

const selectedKey = ref("prod");
const cardsData = ref([]);
const currentCardUrl = ref(""); // 保存当前鼠标所在卡片的 URL

async function getEnvIcons(env) {
  const res = await List({ Env: env });
  cardsData.value = res.Data.Items;
}

// 处理菜单项点击事件
const handleMenuClick = async (key) => {
  selectedKey.value = key;
  await getEnvIcons(key);
};

const goToCardPath = (url) => {
  window.open(url, "_blank"); // 在新页面中打开指定的路径
};

const showCardUrl = (url) => {
  currentCardUrl.value = url;
};

const hideCardUrl = () => {
  currentCardUrl.value = "";
};

onMounted(() => {
  handleMenuClick("prod");
});
</script>

<style scoped>
.env-select {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}

.page-container {
  display: flex;
  flex-direction: row;
  flex-direction: column;
}

.cards-list {
  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap; /* 自动换行 */
  gap: 16px; /* 卡片之间的间距 */
}
</style>
