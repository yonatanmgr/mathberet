import { useEffect } from 'react';
import {
  BlockElement,
  WidgetType,
  newWidgetRequest,
} from '@renderer/common/types';
import { useGeneralContext } from '@components/GeneralContext';

export function useAddBlock(setStateFunction: (...args: unknown[]) => unknown) {
  const { newWidgetRequest } = useGeneralContext();

  useEffect(() => {
    if (newWidgetRequest) AddWidget(newWidgetRequest);
  }, [newWidgetRequest]);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addBlockByType(
    blockType: number,
    height: number,
    width?: number,
    minHeight?: number,
    minWidth?: number,
    maxHeight?: number,
    maxWidth?: number,
  ) {
    setStateFunction((prev: { items: BlockElement[] }) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: blockType,
          i: crypto.randomUUID(),
          metaData: {},
          x: Infinity,
          y: Infinity,
          h: height,
          w: width ? width : 8,
          minH: minHeight ? minHeight : 1,
          minW: minWidth ? minWidth : 1,
          maxH: maxHeight ? maxHeight : 100,
          maxW: maxWidth ? maxWidth : 8,
        } as BlockElement,
      ],
    }));
  }

  const addWidgetHandlersMap = new Map<WidgetType, () => void>([
    [WidgetType.Divider, () => addBlockByType(WidgetType.Divider, 1, 8, 1, 1, 1)],
    [WidgetType.Graph, () => addBlockByType(WidgetType.Graph, 6, 8, 2, 2)],
    [WidgetType.Text, () => addBlockByType(WidgetType.Text, 2)],
    [WidgetType.Math, () => addBlockByType(WidgetType.Math, 2)],
    [WidgetType.Draw, () => addBlockByType(WidgetType.Draw, 6, 8, 4, 4)],
    [WidgetType.Picture, () => console.error('not implemented')],
    [WidgetType.Group, () => console.error('not implemented')],
  ]);
}
