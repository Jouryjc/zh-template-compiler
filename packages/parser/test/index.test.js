import { describe, test, expect } from 'vitest'
const { parse } = require('../dist/zh-template-compiler.cjs')

describe('zh-template-compiler', () => {
  test('不带属性的组件', () => {
    const template = `<组件></组件>`
    const ast = parse(template)

    expect(ast.attrs.length).toBe(0)
    expect(ast.children.length).toBe(0)
    expect(ast.type).toBe(1)
    expect(ast.tag).toBe('组件')
  })

  test('组件开始和结束标签不一致', () => {
    const template = `<组件></组件组件>`
    
    try {
      parse(template)
    } catch (e) {
      expect(e.message).toBe('开始标签和结束标签不一致')
    }
  })

  test('带静态属性的组件', () => {
    const template = `<组件 属性="值"></组件>`
    const ast = parse(template)

    const attr = ast.attrs
    expect(attr.length).toBe(1)
    expect(attr[0]).toEqual({
      isBind: false,
      name: "属性",
      value: "值"
    })
  })

  test('带动态属性的组件', () => {
    const template = `<组件 :属性="值"></组件>`
    const ast = parse(template)

    const attr = ast.attrs
    expect(attr.length).toBe(1)
    expect(attr[0]).toEqual({
      isBind: true,
      name: "属性",
      value: "值"
    })
  })

  test('复杂的属性值', () => {
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
  </下拉框>`

    const ast = parse(template)
    expect(ast).toMatchSnapshot()
  })

  test('带静态+动态属性的组件', () => {
    const template = `<组件 静态属性="静态属性的值" :动态属性="动态属性的值"></组件>`
    const ast = parse(template)

    const attrs = ast.attrs
    expect(attrs.length).toBe(2)
    expect(attrs).toEqual([{
      isBind: false,
      name: "静态属性",
      value: "静态属性的值"
    }, {
      isBind: true,
      name: "动态属性",
      value: "动态属性的值"
    }])
  })

  test('组件名称只能包含汉字', () => {
    const template = `<组件1></组件1>`

    try {
      parse(template)
    } catch (e) {
      console.log(e)
      expect(e.message).toBe('Expected ":", ">", or [一-龥] but "1" found.')
    }
  })

  test('属性名称只能包含汉字', () => {
    const template = `<组件 属性1="值1"></组件>`

    try {
      parse(template)
    } catch (e) {
      console.log(e)
      expect(e.message).toBe('Expected \"=\" or [一-龥] but \"1\" found.')
    }
  })

  test('包含子组件', () => {
    const template = `<组件><子组件></子组件></组件>`
    const ast = parse(template)

    expect(ast).toMatchSnapshot()
  })

  test('包含多个子组件', () => {
    const template = `<组件><第一个子组件></第一个子组件><第二个子组件></第二个子组件></组件>`
    const ast = parse(template)

    expect(ast).toMatchSnapshot()
  })

  test('包含多层子组件', () => {
    const template = `<组件><子组件><孙子组件></孙子组件></子组件></组件>`
    const ast = parse(template)

    expect(ast).toMatchSnapshot()
  })
})