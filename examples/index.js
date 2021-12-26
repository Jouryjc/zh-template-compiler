import Vue from 'vue'
console.log(window)
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
  }"></下拉框>
`;
const ast = parse(template)
console.log(ast)

const { createApp } = Vue

const app = createApp({
  template: `<select></select>`
})

app.mount('#app')

