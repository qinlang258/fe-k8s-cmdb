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
