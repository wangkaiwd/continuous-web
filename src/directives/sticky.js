const onScroll = () => {
  const { value: topSpace = 0 } = gBinding;
  const { left, width } = gElInfo;
  const scrollY = window.scrollY;
  if (scrollTop - scrollY < topSpace) {
    gEl.style.position = 'fixed';
    gEl.style.width = `${width}px`;
    gEl.style.left = `${left}px`;
    gEl.style.top = `${topSpace}px`;
    wrapper.style.height = `${gEl.offsetHeight}px`;
  } else {
    gEl.style.position = 'static';
    gEl.style.left = undefined;
    gEl.style.top = undefined;
  }
};
const insertWrapper = (el) => {
  const parent = el.parentNode;
  const wrapper = document.createElement('div');
  wrapper.classList.add('wd-sticky-wrapper');
  parent.replaceChild(wrapper, el);
  wrapper.appendChild(el);
  return wrapper;
};
// 保存全局比变量，因为要在unbind的时候去除事件监听，所以监听函数必须要完全相同
let gEl = {}, gBinding = {}, gElInfo = {}, wrapper = {}, scrollTop;
const sticky = {
  inserted (el, binding) {
    wrapper = insertWrapper(el);
    gEl = el;
    gBinding = binding;
    const elInfo = el.getBoundingClientRect();
    gElInfo = elInfo;
    scrollTop = elInfo.top + window.scrollY;
    window.addEventListener('scroll', onScroll);
  },
  unbind () {
    window.removeEventListener('scroll', onScroll);
  }
};
export default sticky;
