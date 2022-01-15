import { describe, test, expect } from "vitest";
import { generate } from "../src/index";
import type { NODE } from "../src/types";

describe("ast 生成器", () => {

  test("单个不带属性节点", () => {
    const ast: NODE = {
      type: 1,
      tag: "下拉框",
      attrs: [],
      children: []
    }

    expect(generate(ast)).toBe(`h('select', {})`)
  })

  test('单个带属性的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '下拉框',
      attrs: [
        {
          isBind: false,
          name: '值',
          value: '番茄'
        }
      ],
      children: []
    }

    expect(generate(ast)).toBe(`h('select', {"value":"番茄"})`)
  })

  test('带文本孩子的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '选项',
      attrs: [],
      children: ['番茄']
    }

    expect(generate(ast)).toBe(`h('option', {}, '番茄')`)
  })

  test('只带节点孩子的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '下拉框',
      attrs: [],
      children: [
        {
          type: 1,
          tag: '选项',
          attrs: [],
          children: [
          ]
        }
      ]
    }

    expect(generate(ast)).toBe(`h('select', {}, [h('option', {})])`)
  })

  test('带两种类型孩子的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '下拉框',
      attrs: [],
      children: [
        {
          type: 1,
          tag: '选项',
          attrs: [],
          children: [
            '番茄'
          ]
        }
      ]
    }

    expect(generate(ast)).toBe(`h('select', {}, [h('option', {}, '番茄')])`)
  })

  test('带标签孩子的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '下拉框',
      attrs: [],
      children: [
        {
          type: 1,
          tag: '选项',
          attrs: [
            {
              isBind: false,
              name: '值',
              value: '番茄'
            }
          ],
          children: [
            '番茄'
          ]
        }
      ]
    }

    expect(generate(ast)).toBe(`h('select', {}, [h('option', {"value":"番茄"}, '番茄')])`)
  })

  test('带2个标签孩子的节点', () => {
    const ast: NODE = {
      type: 1,
      tag: '下拉框',
      attrs: [],
      children: [
        {
          type: 1,
          tag: '选项',
          attrs: [],
          children: [
            '番茄'
          ]
        },
        {
          type: 1,
          tag: '选项',
          attrs: [],
          children: [
            '香蕉'
          ]
        }
      ]
    }

    expect(generate(ast)).toBe(`h('select', {}, [h('option', {}, '番茄'), h('option', {}, '香蕉')])`)
  })

  // test("完整", () => {
    
  //   const ast: NODE = {
  //     "type": 1,
  //     "tag": "下拉框",
  //     "attrs": [
  //       {
  //         "isBind": false,
  //         "name": "值",
  //         "value": "番茄"
  //       }
  //     ],
  //     "children": [
  //       {
  //         "type": 1,
  //         "tag": "选项",
  //         "attrs": [
  //           {
  //             "isBind": false,
  //             "name": "值",
  //             "value": "番茄"
  //           }
  //         ],
  //         "children": [
  //           "番茄"
  //         ]
  //       },
  //       {
  //         "type": 1,
  //         "tag": "选项",
  //         "attrs": [
  //           {
  //             "isBind": false,
  //             "name": "值",
  //             "value": "香蕉"
  //           }
  //         ],
  //         "children": [
  //           "香蕉"
  //         ]
  //       }
  //     ]
  //   }

  //   expect(generate(ast)).toBe(`rn h('select', {"value":"番茄"}, [h('option', {"value":"番茄"}, '番茄'), h('option', {"value":"香蕉"}, '香蕉')])`);
  // });
});
