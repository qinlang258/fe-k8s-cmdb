<template>
  <div>
    <a-select
      v-model:value="selectedConfigKey"
      placeholder="请选择系统配置项目"
      @change="fetchTableData"
      style="width: 180px"
      :options="sysconfigOptions"
    >
    </a-select>

    <a-table :columns="columns" :data-source="tableData"></a-table>

    <a-button type="primary" @click="showAddForm" v-if="selectedConfigKey"
      >新增</a-button
    >

    <a-modal
      v-model:visible="isAddFormVisible"
      title="新增配置项"
      @ok="handleAdd"
      @cancel="handleCancel"
    >
      <a-form ref="addForm">
        <a-form-item label="配置项的英文名">
          <a-input
            v-model:value="selectedConfigVal"
            placeholder="配置项的英文名"
          />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="selectedMarkVal" placeholder="中文描述" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  SysconfigListKey,
  SysconfigList,
  SysconfigAdd,
  SysconfigDelete,
} from "@/api/system";
import { columns } from "./const/columns";

const sysconfigOptions = ref([]); // 下拉框选项
const tableData = ref([]); // 表格数据
const selectedConfigKey = ref();
const selectedConfigVal = ref();
const selectedMarkKey = ref();
const selectedMarkVal = ref();

// 表单状态
const isAddFormVisible = ref(false);
// 显示新增表单
function showAddForm() {
  isAddFormVisible.value = true;
}

// 处理新增操作
async function handleAdd() {
  try {
    const res = await SysconfigAdd({
      ConfigKey: selectedConfigKey.value,
      ConfigVal: selectedConfigVal.value,
      MarkKey: selectedMarkKey.value,
      MarkVal: selectedMarkVal.value,
    });
    if (res.Code === 0) {
      // 新增成功后刷新下拉框和表格数据
      await getSysconfigOptionsList();
      await fetchTableData();
      isAddFormVisible.value = false;
    } else {
      console.error("新增失败:", res.Message);
    }
  } catch (error) {
    console.error("请求失败:", error);
  }
}

// 取消新增操作
function handleCancel() {
  isAddFormVisible.value = false;
}

// 获取下拉框选项
async function getSysconfigOptionsList() {
  const res = await SysconfigListKey();
  if (res && res.Data && res.Data.Items) {
    sysconfigOptions.value = res.Data.Items.map((item) => ({
      value: item.configKey,
      label: item.markKey,
    }));
  }
}

// 获取表格数据
async function fetchTableData() {
  if (selectedConfigKey) {
    const res = await SysconfigList({ config_key: selectedConfigKey.value });
    if (res && res.Data && res.Data.Items) {
      tableData.value = res.Data.Items;
      console.log(res.Data.Items);
      selectedMarkKey.value = res.Data.Items[0].markKey;
      selectedConfigKey.value = res.Data.Items[0].configKey;
    }
  }
}

// 初始化
onMounted(() => {
  getSysconfigOptionsList();
});
</script>

<style scoped>
/* 在这里添加您的 CSS 样式 */
</style>
