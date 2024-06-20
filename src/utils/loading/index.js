import loadingImg from '@/assets/loading.svg';
import styles from './loading.module.less';

/**
 * Vue自定义指令，加载中时显示提示
 * @param {Object} el 指令所在的Dom
 * @param {Boolean} binding 绑定的数据
 * @returns {undefined}
 */
export default function (el, binding) {
  const isExist = el.querySelector(`.${styles['loading-container']}`);
  if (!binding.value) {
    // 加载完成移除遮罩
    if (isExist) isExist.remove();
  } else {
    if (isExist) return;
    // 加载中添加遮罩
    const loadingContainer = document.createElement('div');
    const img = document.createElement('img');
    img.src = loadingImg;
    loadingContainer.classList.add(styles['loading-container']);
    loadingContainer.appendChild(img);
    el.appendChild(loadingContainer);
  }
}
