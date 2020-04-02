/**
 * @author:L.Halvee
 */

const CloneNode = node => {
  let _node = node.clone()
  _node.parent = node.parent
  return _node
}

module.exports.getDeepNode = function getDeepNode(node, deep = []) {
  let parent = node.parent
  let _node = node.clone()
  if (parent) {
    parent = CloneNode(parent)
    parent = parent.removeAll()
    parent.append(_node)
    getDeepNode(parent)
    return _node
  } else {
    return _node
  }
}
