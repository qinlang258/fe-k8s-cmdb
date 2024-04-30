<template>
  <a-modal title="新增配置项" :open="open">
    <a-form
      ref="addForm"
      @submit="handleSubmit"
      label-width="120px"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :cancelText
      @finish="handleSubmit"
      @finishFailed="handleClose"
    >
      <a-form-item label="配置项的英文名">
        <a-input
          v-model:value="selectedConfigVal"
          placeholder="配置项的英文名"
        />
      </a-form-item>
      <a-form-item label="描述">
        <a-input v-model:value="selectedMarkVal" placeholder="中文描述" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button @click="handleClose">取消</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, onMounted } from "vue";
const emit = defineEmits(["close", "reloadtable"]);

const open = ref(false);
const selectedConfigVal = ref();
const selectedMarkVal = ref();

// 关闭编辑页面
const handleClose = () => {
  open.value = false; // Close the drawer
  console.log("关闭");
  emit("close"); // Emit the 'close' event
};

const handleSubmit = () => {
  open.value = false;

  const formData = {
    ServiceId: -1,
    ServiceName: inputServiceName.value,
    GitlabId: inputGitlabId.value,
    K8SCluster: selectedK8SClusterOptions.value,
    Namespace: inputNamespace.value,
    Envs: selectedEnvsOptions.value,
    Labels: tagData.value,
  };
  console.log("formData: ", formData);

  console.log("提交完毕");
  emit("close"); // Emit the 'close' event
};

onMounted(() => {
  open.value = true;
});
</script>
