import request from "@/utils/http";

const token = localStorage.getItem("token");

export const K8sStsList = (data) => {
  return request({
    url: "/api/k8s/sts/list",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const K8sStsGet = (data) => {
  return request({
    url: "/api/k8s/sts/get",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};
