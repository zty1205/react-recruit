// 手动实现 即index.js 解析出的应该是这样的
// 在浏览器和node环境下都能支持
(function() {
  function moduleA(require, module, exports) {
    console.log('hello bundle')
    module.exports = 'hello bundle'
  }
  const module = {exports: {}}
  moduleA(null, module)
})()