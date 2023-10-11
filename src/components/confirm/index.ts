import { h, render } from "vue";
import XtxConfirm from "./confirm.vue";
type Props = {
  text: string;
  title?: string;
};

// 封装成函数
// 准备容器
const div = document.createElement("div");

div.setAttribute("class", "xtx-confirm-container");
document.body.appendChild(div);
export default function Confirm({ text, title }: Props) {
  return new Promise((resolve, reject) => {
    const confirmCallback = () => {
      render(null, div);
      resolve(undefined);
    };
    const cancelCallback = () => {
      render(null, div);
      reject(undefined);
    };
    // 1.创建虚拟dom h(某组件 标签属性 子节点 )
    const vNode = h(XtxConfirm, {
      text,
      title,
      confirmCallback,
      cancelCallback,
    });
    //   2.动态trender到容器中
    render(vNode, div);

    //   不会和别的组件冲突
  });
}
