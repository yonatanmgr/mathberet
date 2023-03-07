export enum WidgetType {
  Divider,
  Graph,
  Group,
  Text,
  Math,
  Picture,
  Draw,
}

export type BlockElement = {
  type: WidgetType;
  metaData?: any;
} & ReactGridLayout.Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};
