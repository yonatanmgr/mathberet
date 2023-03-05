import '../Page.scss';
import React, { useEffect, useState } from 'react';
import 'gridstack/dist/gridstack.css';
// import { renderToString } from 'react-dom/server';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';
import TextBlockContent from './TextBlock';
import _ from 'lodash';

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

const PageGrid = (props) => {
  const {
    className = 'layout',
    cols = { lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 },
    rowHeight = 50,
    isBounded = true,
    resizeHandles = ['sw'],
    containerPadding = [0, 0],
    breakpoints = { lg: 800, md: 600, sm: 400, xs: 200, xxs: 100 },
  } = props;

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

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setState((prev) => ({ ...prev, breakpoint, cols }));
  };

  const onLayoutChange = (layout) => {
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
    /*eslint no-console: 0*/
    console.log('adding', 'n' + state.newCounter);
    setState({
      // Add a new item. It must have a unique key!
      items: state.items.concat({
        i: 'n' + state.newCounter,
        x: Infinity,
        y: Infinity, // puts it at the bottom
        w: 8,
        h: 2,
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: state.newCounter + 1,
    });
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
    <div>
      <button onClick={addText}>Add Item</button>
      <ResponsiveGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        {...props}
      >
        {_.map(state.items, (el) => createElement(el))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default PageGrid;
