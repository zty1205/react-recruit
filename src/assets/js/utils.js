export function setRem (pageSize) {
  let wWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
  document.getElementsByTagName('html')[0].style.fontSize = wWidth / pageSize * 100 + 'px'
}
export function fixRem() {
  let html = document.getElementsByTagName("html")[0];
  let originFontSize = parseFloat(html.style.fontSize);
  let hideDom = document.createElement("div");
  document.body.appendChild(hideDom);
  hideDom.style.cssText = "position: absolute; top: -10000px; left: -10000px; width: 1rem";
  let currentWidth = parseFloat(hideDom.offsetWidth);
  if (currentWidth !== originFontSize) {
    html.style.fontSize = originFontSize / currentWidth * originFontSize + "px";
  }
  hideDom.parentElement.removeChild(hideDom);
}