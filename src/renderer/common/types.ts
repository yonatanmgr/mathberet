import { Descendant } from "slate";

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
  content: {
    latex?: string,
    plots?: Array<string>,
    text?: Array<Descendant>
  }
}

export type BlockElement = {
  type: WidgetType;
  metaData?: ValueProps;
} & ReactGridLayout.Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};
