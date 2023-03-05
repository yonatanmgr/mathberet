import '../Page.scss';
import React, { useEffect, useState } from 'react';
import 'gridstack/dist/gridstack.css';
// import { renderToString } from 'react-dom/server';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';
import TextBlockContent from './TextBlock';

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

const PageGrid = () => {
  const [state, setState] = useState({
    items: [],
    newCounter: 0,
  });

  const createElement = (el) => {
    const i = el.add ? '+' : el.i;
    return (
      <div className='block' data-grid={el} key={i}>
        <div className='block-handle'>
          <i className='fi fi-rr-menu-dots-vertical' />
        </div>
        <div className='block-content'>
          <span
            className='block-remove-button'
            onClick={onRemoveItem.bind(this, i)}
          >
            <i className='fi fi-rr-x'></i>
          </span>
          <TextBlockContent></TextBlockContent>
        </div>
      </div>
    );
  };

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setState((prev) => ({ ...prev, breakpoint, cols }));
  };

  const onLayoutChange = (layout: ReactGridLayout.Layout[]) => {
    setState((prev) => ({ ...prev, layout }));
  };

  const onRemoveItem = (i) => {
    console.log('removing', i);
    // setItems({ items: _.reject(state.items, { i: i }) });
    //Todo: not implemented
    setState((prev) => ({ ...prev, items: [] }));
  };

  const { newWidgetRequest, clearPageRequest } = useGeneralContext();

  const addWidgetHandlersMap = new Map<WidgetType, () => void>([
    [WidgetType.Divider, addDivider],
    [WidgetType.Ggb, addGgb],
    [WidgetType.Group, addGroup],
    [WidgetType.Text, addText],
    [WidgetType.Math, addMath],
    [WidgetType.Picture, addPicture],
  ]);

  useEffect(() => {
    if (newWidgetRequest) AddWidget(newWidgetRequest);
  }, [newWidgetRequest]);

  useEffect(() => {
    // todo: clear page
    console.log('page should be cleared');
  }, [clearPageRequest]);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    console.log(newWidgetRequest);
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addText() {
    console.log('adding', 'n' + state.newCounter);
    setState((prev) => ({
      // Add a new item. It must have a unique key!
      items: [
        ...prev.items,
        {
          i: 'n' + prev.newCounter,
          x: Infinity,
          y: Infinity, // puts it at the bottom
          w: 8,
          h: 2,
        },
      ],
      newCounter: prev.newCounter + 1,
    }));
  }

  function addPicture() {
    console.error('not implemented');
  }

  function addGgb() {
    console.error('not implemented');
  }

  function addMath() {
    console.error('not implemented');
  }
  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    console.error('not implemented');
  }

  return (
    <ResponsiveGridLayout
      onLayoutChange={onLayoutChange}
      onBreakpointChange={onBreakpointChange}
      className='layout'
      cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
      rowHeight={50}
      isBounded={true}
      resizeHandles={['sw']}
      containerPadding={[0, 0]}
      breakpoints={{ lg: 800, md: 600, sm: 400, xs: 200, xxs: 100 }}
    >
      {state.items.map((el) => createElement(el))}
    </ResponsiveGridLayout>
  );
};

export default PageGrid;
