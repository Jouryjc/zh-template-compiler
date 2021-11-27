# zh-template-compiler

> 中文模板编译器，一个 pegjs 的玩具 💥

### ✨ Installation

```shell
npm install zh-template-compiler

or

yarn add zh-template-compiler
```

### 🔥 Example
```js
const { parse } = require('zh-template-compiler')

const ast = parse(`<组件 属性="值"></组件>`)

console.log(ast)
// {
//    "type": "component",
//    "name": "组件",
//    "attrs": [
//       {
//          "isBind": false,
//          "key": "属性",
//          "value": "值"
//       }
//    ],
//    "children": []
// }
```