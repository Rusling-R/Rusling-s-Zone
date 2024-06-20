import Icon from '@/components/Icon';
import { getComponentRootDom } from '@/utils';
import styles from './popup.module.less';

/**
 * 弹出消息提示
 * @param {String} text 消息内容
 * @param {String} lvl 消息类型，['info', 'success', 'warn', 'error']
 */
export default function popUp(text = '有新消息', lvl = 'info') {
  // 创建元素
  const popUp = document.createElement('div');
  // 添加图标
  const icon = getComponentRootDom(Icon, { name: 'info', size: '1.6em' });
  // 写入内容
  popUp.innerHTML = `
    ${icon.outerHTML}
    <span>${text}</span>
  `;
  // 添加样式
  popUp.classList.add(styles['pop-up']);
  popUp.classList.add(styles[lvl]);
  // 加入页面
  document.body.appendChild(popUp);
  // 强制重排重绘
  popUp.clientHeight;
  popUp.style.opacity = 1;
  popUp.style.transform = 'translate(-50%, 1em)';
  popUp.addEventListener(
    'transitionend',
    function () {
      popUp.style.transitionDelay = '0.5s';
      popUp.style.transform = 'translate(-50%, -100%)';
      setTimeout(() => {
        popUp.remove();
      }, 1500);
    },
    { once: true }
  );
}
