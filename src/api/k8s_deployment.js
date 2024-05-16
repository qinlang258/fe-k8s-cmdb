import request from "@/utils/http";

const token = localStorage.getItem("token");

export const K8sDeploymentList = (data) => {
  return request({
    url: "/api/k8s/deployment/list",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const K8sDeploymentGet = (data) => {
  return request({
    url: "/api/k8s/deployment/get",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const K8sDeploymentUpdate = (data) => {
  return request({
    url: "/api/k8s/deployment/update",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};
