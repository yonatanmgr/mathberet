import '../Page.scss';
import React, { useEffect, useState } from 'react';
import 'gridstack/dist/gridstack.css';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';
import TextBlockContent from './TextBlock';
import MathBlockContent from './MathBlock';

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

const PageGrid = () => {
  const [state, setState] = useState({
    items: [],
    newCounter: 0,
  });

  const createElement = (el, type: string) => {
    const i = el.i;
    let block;

    switch (type) {
      case 'Text':
        block = <TextBlockContent />
        break;

      case 'Math':
        block = <></>
        break;

      case 'Graph':
        block = <Geogebra id={i.toString()} appletOnLoad={() => console.log('appletOnLoad')}/>
        break;
    
      default:
        break;
    }

    return (
      <div className='block' data-grid={el} key={i}>
        <div className='block-handle'>
          <i className='fi fi-rr-menu-dots-vertical' />
        </div>
        <div className='block-content'>
         {block}
          <button
            title='x'
            name={el.i}
            className='block-remove-button'
            onClick={onRemoveItem}
          >
            {/* <i className='fi fi-rr-x'></i> */}
            X
          </button>
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

  const onRemoveItem = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e)
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.i !== e.target.name),
    }));
  };

  const { newWidgetRequest, clearPageRequest } = useGeneralContext();

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
          type: 'Text',
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
    setState((prev) => ({
      // Add a new item. It must have a unique key!
      items: [
        ...prev.items,
        {
          type: 'Graph',
          i: 'n' + prev.newCounter,
          x: Infinity,
          y: Infinity, // puts it at the bottom
          w: 8,
          h: 6,
        },
      ],
      newCounter: prev.newCounter + 1,
    }));
  }

  function addMath() {
    console.log('adding', 'n' + state.newCounter);
    setState((prev) => ({
      // Add a new item. It must have a unique key!
      items: [
        ...prev.items,
        {
          type: 'Math',
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
  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    console.error('not implemented');
  }

  const addWidgetHandlersMap = new Map<WidgetType, () => void>([
    [WidgetType.Divider, addDivider],
    [WidgetType.Ggb, addGgb],
    [WidgetType.Group, addGroup],
    [WidgetType.Text, addText],
    [WidgetType.Math, addMath],
    [WidgetType.Picture, addPicture],
  ]);

  return (
    <div className='grid-container'>
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
        draggableHandle='.block-handle'
      >
        {state.items.map((el) => createElement(el, el.type))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default PageGrid;
