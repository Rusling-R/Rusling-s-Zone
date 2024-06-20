/**
 * 传入一个需要防抖的函数，返回一个经过处理的新函数
 * @param {Function} fn 原函数
 * @param {Number} duration 延迟多长时间执行
 * @returns {Function} 新函数
 */
export default function (fn, duration = 500) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn(...args);
    }, duration);
  };
}
