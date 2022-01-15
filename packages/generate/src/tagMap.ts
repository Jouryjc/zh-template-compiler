import { TagMap } from "./types";


let tagMap = new Map(
  [
    ['下拉框', 'select'],
    ['选项', 'option']
  ]
)

export function getTag (tagType: TagMap): string | void {
  return tagMap.get(tagType)
}
