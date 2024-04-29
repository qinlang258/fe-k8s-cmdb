const menuList = [
    {
      path: "/home",
      name: "导航页",
      key: "Home",
      icon: "HomeTwoTone"
    },
    {
        path: "/k8s",
        name: "k8s",
        key: "K8S",
        icon: "HomeTwoTone",
        children: [
          {
            path: "/k8s/node",
            name: "节点信息",
            key: "node"
          }
        ]     
      }   
  ];
  export default menuList;