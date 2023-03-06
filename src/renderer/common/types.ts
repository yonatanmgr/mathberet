export enum WidgetType {
  Divider,
  Graph,
  Group,
  Text,
  Math,
  Picture,
  Draw,
}

export type newWidgetRequest = {
  widgetType: WidgetType;
};
