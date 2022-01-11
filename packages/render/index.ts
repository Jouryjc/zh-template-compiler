const { parse } = require('./zh-template-compiler')

const template = `
<下拉框 选中值="番茄" :数据="{
  "list":[
      {
        "名称": "🍅",
        "id": "番茄"
      },
      {
        "名称": "🍌",
        "id": "香蕉"
      }
  ],
    "total": 2
  }">
  <子组件></子组件>
</下拉框>
`

const ast = parse(template)
console.log(ast)
