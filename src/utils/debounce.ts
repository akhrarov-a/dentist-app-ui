/**
 * Debounce function
 */
const debounce = (callback: (...args: any[]) => void, wait: number) => {
  let timeoutId: NodeJS.Timeout = null;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export { debounce };
