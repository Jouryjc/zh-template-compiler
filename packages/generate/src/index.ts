
import { getTag } from './tagMap';
import {generateAttrs} from './attrs'
import type { NODE, Children } from './types'

function generateItem (node: NODE) {
  const { attrs, tag, } = node

  const dom = getTag(tag)
  const props = generateAttrs(attrs)

  return `h('${dom}', ${JSON.stringify(props)}`
}

export function generate (ast: NODE): string {
  let code = ''

  function dfs (node: NODE) {
    if (!node) {
      return;
    }

    let str = generateItem(node)
    let children = node.children
    let len = children.length

    // 文本的情况
    if (len === 1 && typeof children[0] === 'string') {
      str += `, '${children[0]}')`
    // 没有子节点
    } else if (len === 0) {
      str += ')'
    } else {
      // 子节点数组
      let childrenArr = []
      for (let item of children) {
        childrenArr.push(dfs(item as NODE))
      }

      str += `, [${childrenArr.join(', ')}])`
    }

    return str
  }

  code += dfs(ast)
  return code
}