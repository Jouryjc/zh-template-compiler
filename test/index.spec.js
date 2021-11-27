// jest.mock('../src/zh-template-compiler')
const { parse, SyntaxError } = require('../src/zh-template-compiler')

describe('中文模板编译器', () => {
  test('不带属性的组件', () => {
    const template = `<组件></组件>`
    const ast = parse(template)

    expect(ast.attrs.length).toBe(0)
    expect(ast.children.length).toBe(0)
    expect(ast.type).toBe('component')
    expect(ast.name).toBe('组件')
  })

  test('带静态属性的组件', () => {
    const template = `<组件 属性="值"></组件>`
    const ast = parse(template)

    const attr = ast.attrs
    expect(attr.length).toBe(1)
    expect(attr[0]).toEqual({
      isBind: false,
      key: "属性",
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
      key: "属性",
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
      key: "静态属性",
      value: "静态属性的值"
    }, {
      isBind: true,
      key: "动态属性",
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