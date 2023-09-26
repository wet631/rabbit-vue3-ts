import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export function useLazyData(apiFn: () => void) {
  const target = ref(null);
  // 请求懒加载
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop();
        apiFn();
      }
    },
    {
      threshold: 0,
    }
  );

  return target;
}
