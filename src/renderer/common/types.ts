import { TDShape, TDBinding, TDAsset } from '@tldraw/tldraw';
import { Layout, Layouts } from 'react-grid-layout';
// eslint-disable-next-line import/named
import { Descendant } from 'slate';

export enum WidgetType {
  Divider,
  Graph,
  Group,
  Text,
  Math,
  Picture,
  Draw,
}

export type canvasProps = {
  shapes: TDShape[];
  bindings?: TDBinding[];
  assets?: TDAsset[];
};

export type ValueProps = {
  blockStateFunction: (...args: unknown[]) => unknown;
  content: string | string[] | Descendant[] | canvasProps;
};

export type BlockState = {
  id: string,
  metaData: {content: string | string[] | Descendant[] | canvasProps},
}

export type FileStructure = {
  tags: string[];
  blocks: Array<BlockElement>;
  mathMemory: object;
};

export type BlockElement = {
  type: WidgetType;
  metaData?: ValueProps;
} & Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};

export interface CustomLayouts {
  [P: string]: BlockElement[];
}