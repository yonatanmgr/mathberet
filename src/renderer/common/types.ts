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

export type ValueProps = {
  blockStateFunction: (...args: unknown[]) => unknown;
  content: {
    latex?: string;
    plots?: Array<string>;
    text?: Array<Descendant>;
    canvas?: {
      shapes: TDShape[];
      bindings?: TDBinding[];
      assets?: TDAsset[];
    };
  };
};

export type BlockElement = {
  type: WidgetType;
  metaData?: ValueProps;
} & ReactGridLayout.Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};
