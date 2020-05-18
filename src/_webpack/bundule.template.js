
(function() {
  var moduleList = [
    /* template-module-list */
  ]
  var moduleDepList = [
    /* template-module-dep-list */
  ]
  function require(id, parentId) {
    var currentModlueId = parentId !== undefined ? moduleDepList[parentId][id] : id
    var module = {exports: {}}
    var moduleFunc = moduleList[currentModlueId]
    moduleFunc(id => require(id, currentModlueId), module, module.exports)
    return module.exports
  }

  require(0)
})()