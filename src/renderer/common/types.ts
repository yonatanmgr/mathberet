export enum WidgetType {
  Divider,
  Ggb,
  Group,
  Text,
  Math,
  Picture,
  Draw,
}

export type newWidgetRequest = {
  widgetType: WidgetType;
};
