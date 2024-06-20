import $eventListener from '@/eventListener';
import { debounce } from '@/utils';

let lazyImg = [];

function loadImagesTemp() {
  for (const i of lazyImg) {
    loadImg(i);
  }
}

function loadImg(img) {
  const rect = img.dom.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < document.documentElement.clientHeight) {
    const imgTemp = new Image();
    imgTemp.onload = () => {
      img.dom.src = img.src;
      imgTemp.onload = null;
    };
    imgTemp.src = img.src;
    lazyImg = lazyImg.filter(i => i.dom !== img.dom);
  }
}

const loadImages = debounce(loadImagesTemp);

$eventListener.$on('scan', loadImages);

export default {
  inserted(el, binding) {
    lazyImg.push({
      dom: el,
      src: binding.value
    });
    loadImages();
  },
  unbind(el) {
    lazyImg = lazyImg.filter(i => i.dom !== el);
    $eventListener.$off('scan', loadImages);
  }
};
