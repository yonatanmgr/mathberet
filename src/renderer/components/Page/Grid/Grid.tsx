import '../Page.scss';
import React, { useEffect, useState } from 'react';
import { GridStack, GridStackWidget } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import GridBlock from './Block';
// import { renderToString } from 'react-dom/server';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';
import _ from "lodash";

import GridLayout, { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

function blockData(
  html: JSX.Element,
  id: number,
  type: string,
  h: number,
  blockContent = {},
  x = 12,
  y = 1000,
  w = 6,
  minW = 2,
  minH = 2,
  maxH = 1000,
  maxW = 12,
) {
  return {
    id: id,
    content: html,
    x: x,
    y: y,
    h: h,
    w: w,
    minW: minW,
    minH: minH,
    type: type,
    blockContent: blockContent,
    maxH: maxH,
    maxW: maxW,
  } as GridStackWidget;
}


const PageGrid = () => {
  class Grid extends React.PureComponent {
    static defaultProps = {
      className:"layout",
      cols:{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 },
      rowHeight:50,
      isBounded:true,
      resizeHandles:['sw'],
      draggableHandle: '.block-handle',
      containerPadding:[0,0],
      breakpoints:{ lg: 800, md: 600, sm: 400, xs: 200, xxs: 100 },
      onLayoutChange: function () {}
    };
  
    constructor(props: object) {
      super(props);
  
      this.state = {
        items: [],
        newCounter: 0
      };
  
      this.onAddItem = this.onAddItem.bind(this);
      this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }
  
    createElement(el) {
      const i = el.add ? "+" : el.i;
      return (
        <div className='block' data-grid={el} key={i}>
          <div className='block-handle'>
            <i className='fi fi-rr-menu-dots-vertical' />
          </div>
          <div className='block-content'>
            <span className="block-remove-button" onClick={this.onRemoveItem.bind(this, i)}>
              <i className='fi fi-rr-x'></i>
            </span>
          </div>
        </div>
      );
    }
  
    onAddItem() {
      /*eslint no-console: 0*/
      console.log("adding", "n" + this.state.newCounter);
      this.setState({
        // Add a new item. It must have a unique key!
        items: this.state.items.concat({
          i: "n" + this.state.newCounter,
          x: Infinity,
          y: Infinity, // puts it at the bottom
          w: 8,
          h: 2
        }),
        // Increment the counter to ensure key is always unique.
        newCounter: this.state.newCounter + 1
      });
    }
  
    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
      this.setState({
        breakpoint: breakpoint,
        cols: cols
      });
    }
  
    onLayoutChange(layout) {
      this.props.onLayoutChange(layout);
      this.setState({ layout: layout });
    }
  
    onRemoveItem(i) {
      console.log("removing", i);
      this.setState({ items: _.reject(this.state.items, { i: i }) });
    }
  
    render() {
      return (
        <div>
          <button onClick={this.onAddItem}>Add Item</button>
          <ResponsiveGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props}
          >
            {_.map(this.state.items, el => this.createElement(el))}
          </ResponsiveGridLayout>
        </div>
      );
    }
  }

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
    console.error('not implemented');
  }

  function addPicture() {
    console.error('not implemented');
  }

  function addGgb() {
    console.error('not implemented');
    // const id = Date.now();
    // const html = 
    //   <Geogebra
    //     id={id.toString()}
    //     width={800}
    //     height={600}
    //     showMenuBar
    //     showToolBar
    //     showAlgebraInput
    //     appletOnLoad={() => console.log('appletOnLoad')}
    //   />
  }

  function addMath() {
    console.error('not implemented');
  }
  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    console.error('not implemented');
    // const id = Date.now();
    // const html = <hr className='pageDivider' />;
    // const block = blockData(
    //   html,
    //   id,
    //   'Divider',
    //   1,
    //   {},
    //   12,
    //   1000,
    //   12,
    //   1,
    //   1,
    //   1,
    //   12,
    // );
  }

  return <div className='grid-container'><Grid /></div>;
};

export default PageGrid;
