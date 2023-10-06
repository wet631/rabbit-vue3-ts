import { h, render } from "vue";
import XtxMessage from "./message.vue";

let timer: any = null;
type Params = {
  type: "success" | "error" | "warning";
  text: string;
  duration?: number;
};

// 准备一个div 专门用于存放显示隐藏的弹框
// 1.显示 往专门div中显示
// 2.隐藏 将这个专门的div内容销毁
// 往body中新增一个盒子
const divContainer = document.createElement("div");
divContainer.setAttribute("class", "xtx-message-container");
document.body.appendChild(divContainer);

export default function Message({ type, text, duration = 2000 }: Params) {
  // 1.创建虚拟dom
  const vNode = h(XtxMessage, { type, text });
  // 2.动态render
  render(vNode, divContainer);
  clearTimeout(timer);
  //   3.开一个延时器 到时间让他隐藏
  timer = window.setTimeout(() => {
    // 删除虚拟dom
    render(null, divContainer);
  }, duration);
}

Message.error = function (text: string, duration = 2000) {
  Message({
    type: "error",
    text,
    duration,
  });
};
Message.success = function (text: string, duration = 2000) {
  Message({
    type: "success",
    text,
    duration,
  });
};
Message.warning = function (text: string, duration = 2000) {
  Message({
    type: "warning",
    text,
    duration,
  });
};
