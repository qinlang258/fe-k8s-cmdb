<template>
  <a-select
    v-model:value="selectedK8sCluster"
    placeholder="请选择K8S集群"
    style="width: 180px"
    :options="selectedK8sClusterOptions"
    @change="fetchTableData"
  ></a-select>

  <a-select
    v-model:value="selectedNamespace"
    placeholder="请选择Namespace"
    style="width: 180px"
    :options="selectedNamespaceOptions"
    @change="fetchTableData"
  ></a-select>

  <!-- <a-table
    :columns="columns"
    :data-source="tableData"
    :row-key="(record) => record.Name"
    @change="handleTableChange"
  >
    <template #actions="{ record }">
      <a-button @click="detailDataAction(record)">查看详情</a-button>
    </template>
  </a-table> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { SysconfigList } from "@/api/system";
import { K8sNamespaceList } from "@/api/k8s_namespace";
import { columns } from "./const/columns";

const selectedNamespaceOptions = ref([]);
const selectedK8sClusterOptions = ref([]);
const selectedK8sCluster = ref();
const selectedNamespace = ref();

// 更新表格数据
const fetchTableData = async () => {
  await getTableData();
};

// 获取表格数据
const getTableData = async () => {
  let query = {};

  if (selectedK8sCluster.value || selectedNamespace.value) {
    if (selectedK8sCluster.value) {
      query = { ...query, k8s_cluster: selectedK8sCluster.value };
    }

    if (selectedNamespace.value) {
      query = { ...query, namespace: selectedNamespace.value };
    }
  }

  getK8sNamespacesOptions();

  //   const res = await K8sNamespaceLis(query);

  //   console.log(res.value);

  //const appPagedata = res.Data?.Items;

  // 重新设置 tableData ref，将后端返回的数据更新到表格数据中
  //   tableData.value = appPagedata.map((item) => ({
  //     ServiceId: item.ServiceId,
  //     GitlabId: item.GitlabId,
  //     ServiceName: item.ServiceName,
  //     Labels: formatLabels(item.Labels),
  //     Envs: item.Envs,
  //     Namespace: item.Namespace,
  //     K8SCluster: item.K8SCluster,
  //   }));
};

// 获取K8S集群选项
async function getK8sClusterOptions() {
  const res = await SysconfigList({ config_key: "k8s_cluster" });
  if (res && res.Data && res.Data.Items) {
    selectedK8sClusterOptions.value = res.Data.Items.map((item) => ({
      value: item.configVal,
      label: item.markVal,
    }));
  }
}

// 获取K8S集群选项
async function getK8sNamespacesOptions() {
  const res = await K8sNamespaceList({ k8s_cluster: selectedK8sCluster.value });
  if (res && res.Data && res.Data.Items) {
    selectedNamespaceOptions.value = res.Data.Items.map((item) => ({
      value: item.Namespace,
      label: item.Namespace,
    }));
  }
}

console.log(selectedK8sClusterOptions.value);

onMounted(() => {
  getK8sClusterOptions();
  fetchTableData();
});
</script>
