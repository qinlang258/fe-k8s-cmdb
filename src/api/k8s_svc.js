import request from "@/utils/http";

const token = localStorage.getItem("token");

export const K8sSvcLis = (data) => {
  return request({
    url: "/api/k8s/svc/list",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};

export const K8sSvcGet = (data) => {
  return request({
    url: "/api/k8s/svc/get",
    method: "POST",
    data,
    headers: {
      Authorization: `${token}`,
    },
  });
};
