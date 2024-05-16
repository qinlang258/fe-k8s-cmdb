<template>
  <a-drawer
    :open="open"
    :width="720"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    :closable="false"
  >
    <h2>详情应用信息</h2>
    <a-form @finishFailed="handleClose">
      <a-form-item label="服务名">
        <a-input v-model:value="appData.Name" disabled />
      </a-form-item>
      <a-form-item label="副本数量">
        <a-input v-model:value="replicas" />
      </a-form-item>
      <a-form-item label="重启策略">
        <a-input v-model:value="appData.RestartPolicy" disabled />
      </a-form-item>
      <a-form-item label="节点选择">
        <a-input v-model:value="appData.NodeSelector" />
      </a-form-item>
      <a-form-item label="调度器">
        <a-input v-model:value="appData.SchedulerName" disabled />
      </a-form-item>
      <a-form-item label="ServiceAccount">
        <a-input v-model:value="appData.ServiceAccount" disabled />
      </a-form-item>

      <a-form-item label="容器" class="custom-form-item">
        <template v-for="(container, index) in appData.Containers" :key="index">
          <div class="container-item">
            <h3>容器 {{ index + 1 }}</h3>
            <div class="container-details">
              <div class="container-property">
                <span class="property-label">容器名字:</span>
                <span class="property-value">{{
                  container.ContainerName
                }}</span>
              </div>
              <div class="container-property">
                <span class="property-label">镜像:</span>
                <span class="property-value">{{ container.Image }}</span>
              </div>
              <div class="container-property">
                <span class="property-label">容器端口:</span>
                <span
                  class="property-value"
                  v-if="
                    container.ContainerPort &&
                    container.ContainerPort.length > 0
                  "
                >
                  {{
                    container.ContainerPort.map(
                      (ContainerPort) => ContainerPort.ContainerPort
                    ).join(", ")
                  }}
                </span>
                <span class="property-value" v-else>无</span>
              </div>
              <div class="container-property">
                <span class="property-label">资源:</span>
                <span class="property-value">
                  CPU(所需/限制): {{ container.Resources.Requests.Cpu }}/{{
                    container.Resources.Limits.Cpu
                  }}, Memory(所需/限制):
                  {{ container.Resources.Requests.Memory }}/{{
                    container.Resources.Limits.Memory
                  }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </a-form-item>

      <!-- Inside the template -->
      <a-form-item label="关联的SVC" class="custom-form-item">
        <template v-for="(svc, index) in appData.Service" :key="index">
          <div class="container-item">
            <h3>Service {{ index + 1 }}</h3>
            <div class="container-details">
              <div class="container-property">
                <span class="property-label">服务名:</span>
                <span class="property-value">{{ svc.Name }}</span>
              </div>
              <div class="container-property">
                <span class="property-label">Type:</span>
                <span class="property-value">{{ svc.Type }}</span>
              </div>
              <div class="container-property">
                <span class="property-label">端口:</span>
                <span class="property-value" v-if="svc.Ports.length > 0">
                  {{ svc.Ports.map((port) => port.Port).join(", ") }}
                </span>
                <span class="property-value" v-else>无</span>
              </div>
            </div>
          </div>
        </template>
      </a-form-item>

      <a-form-item label="标签">
        <div class="tag-container">
          <div class="tag-row">
            <div class="tag-key">标签键</div>
            <div class="tag-value">标签值</div>
          </div>
          <template v-for="(value, key) in appData.Labels" :key="key">
            <div class="label-item">
              <div class="tag-row">
                <div class="tag-key">{{ key }}</div>
                <div class="tag-value">{{ value }}</div>
              </div>
            </div>
          </template>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button @click="handleClose">关闭</a-button>

        <a-button @click="handleSubmit">
          保存
          <a-col v-if="successMessage" span="24">
            <a-alert message="修改成功" type="success" show-icon />
          </a-col>
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { K8sDeploymentGet, K8sDeploymentUpdate } from "@/api/k8s_deployment";

const open = ref(false);
const LabelsData = ref({});
const emit = defineEmits(["close", "reloadtable"]);
const appData = ref([]);
const replicas = ref();
const successMessage = ref(false); // 控制成功提示的显示状态
const container1 = ref();
const container2 = ref();
const container3 = ref();

const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
});

const formData = ref({ ...props.record });
console.log(formData.value);
replicas.value = formData.value.Replicas;

const getTableData = async () => {
  let query = {};

  if (
    formData.value.Namespace &&
    formData.value.K8sCluster &&
    formData.value.Name
  ) {
    query = { ...query, K8sCluster: formData.value.K8sCluster };
    query = { ...query, Namespace: formData.value.Namespace };
    query = { ...query, Name: formData.value.Name };
  }

  const res = await K8sDeploymentGet(query);

  appData.value = res.Data.Items[0];
};

async function UpdateApp() {
  let query = {};

  if (formData.value.Namespace && formData.value.K8sCluster) {
    query = { ...query, K8sCluster: formData.value.K8sCluster };
    query = { ...query, Namespace: formData.value.Namespace };
    query = { ...query, Name: formData.value.Name };
  }

  // 只有当 选择了集群以及namespace才会去调用这个
  if (replicas.value) {
    query = { ...query, replicas: replicas.value };
  }

  K8sDeploymentUpdate(query);
}

getTableData();

onMounted(() => {
  open.value = true;
});

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

  // 更新主页面表单数据
  UpdateApp();

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

.custom-form-item {
  padding-bottom: 0; /* Reduce bottom padding */
}

.custom-form-item {
  padding-bottom: 0;
}

.container-item {
  margin-bottom: 20px;
}

.container-details {
  border: 1px solid #ddd;
  padding: 10px;
}

.property-label {
  font-weight: bold;
  margin-right: 5px;
}

.property-value {
  color: #555;
}
</style>
