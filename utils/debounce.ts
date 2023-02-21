export function debounce<Function extends (...args: any) => any>(
  func: Function,
  delay: number,
  immediate: boolean = false
): {
  (...args: Parameters<Function>): ReturnType<Function> | undefined;
  cancel(): void;
} {
  let timeout: number | undefined;
  let result: ReturnType<Function> | undefined;

  const debounced = (...args: Parameters<Function>) => {
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = undefined;
      }, delay);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(this, args);
      }, delay);
    }

    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = undefined;
  };

  return debounced;
}
