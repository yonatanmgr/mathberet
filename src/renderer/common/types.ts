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
  metaData?: object;
} & ReactGridLayout.Layout;

export type newWidgetRequest = {
  widgetType: WidgetType;
};
