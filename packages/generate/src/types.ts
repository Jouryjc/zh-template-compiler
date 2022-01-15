export type Children = NODE | string;

export interface NODE {
  type: 1 | 2 | 3;
  tag: string;
  attrs: Attr[];
  children: Children[];
}

export type TagMap = "下拉框" | "选项" | string;

export interface Attr {
  isBind: boolean;
  name: string;
  value: any;
}

export type Attrs = Attr[]
