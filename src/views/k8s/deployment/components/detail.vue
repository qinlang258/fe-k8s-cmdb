<template>
  <a-drawer
    :open="open"
    :width="720"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
  >
    <h2>编辑应用数据</h2>
    <a-form>
      <a-form-item label="标签">
        <div class="tag-container">
          <div class="tag-row">
            <div class="tag-key">标签键</div>
            <div class="tag-value">标签值</div>
          </div>
          <div class="tag-row" v-for="(value, key) in tagData" :key="key">
            <div class="tag-key">{{ key }}</div>
            <div class="tag-value"></div>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

const open = ref(false); // Control drawer visibility
const LabelsData = ref({});

const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "reloadtable"]);

// Update open prop when receiving data
onMounted(() => {
  open.value = true;
});

const formData = ref({ ...props.record });
console.log(props.record);

// 转化json标签
const parseLabels = () => {
  newLabels.value = formData.value.Labels;

  const pairs = newLabels.value.split(",").map((pair) => pair.trim());
  pairs.forEach((pair) => {
    const [key, value] = pair.split(":").map((item) => item.trim());
    tagData.value[key] = value;
  });
};

// 提交表单操作
const handleSubmit = (e) => {
  e.preventDefault();

  console.log("保存数据：", formData.value); // 打印保存的数据
  // 更新主页面表单数据
  emit("reloadtable");
  emit("close");
};

// 关闭编辑页面
const handleClose = () => {
  open.value = false; // Close the drawer
  console.log("关闭");
  emit("close"); // Emit the 'close' event
};
</script>

<style scoped>
.tag-container {
  display: flex;
  flex-direction: column;
}

.tag-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.tag-key {
  flex: 1;
  margin-right: 10px;
}

.tag-value {
  flex: 1;
}
</style>
v
