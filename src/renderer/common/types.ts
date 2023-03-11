import { TDShape, TDBinding, TDAsset } from '@tldraw/tldraw';
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

type canvasProps = {
      shapes: TDShape[];
      bindings?: TDBinding[];
      assets?: TDAsset[];
    }

export type ValueProps = {
  blockStateFunction: (...args: unknown[]) => unknown;
  content: string | string[] | Descendant[] | canvasProps;
};

export type BlockElement = {
  type: WidgetType;
  metaData?: ValueProps;
} & ReactGridLayout.Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};
