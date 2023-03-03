export enum WidgetType {
  Divider,
  Ggb,
  Group,
  Text,
  Math,
  Picture,
}

export type newWidgetRequest = {
  widgetType: WidgetType;
};
