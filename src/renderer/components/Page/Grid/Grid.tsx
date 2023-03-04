import '../Page.scss';
import React, { useEffect, useState } from 'react';
import { GridStack, GridStackWidget } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import GridBlock from './Block';
// import { renderToString } from 'react-dom/server';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';

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

class Grid extends React.Component {
  render() {

    return (
      <ResponsiveGridLayout
        className="layout"
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 }}
        rowHeight={50}
        isBounded={true}
        resizeHandles={['sw']}
        autoSize={true}
        containerPadding={[0,0]}
        breakpoints={{ lg: 800, md: 600, sm: 400, xs: 200, xxs: 100 }}
      >
        <div key="1" data-grid={{ x: 1, y: 0, w: 8, h: 1, minW: 2, maxW: 8 }}>בדיקה</div>
        <div key="2" data-grid={{ x: 1, y: 1, w: 8, h: 2, minW: 2, maxW: 8 }}>בדיקה 2</div>
        <div key="3" data-grid={{ x: 1, y: 2, w: 8, h: 2, minW: 2, maxW: 8 }}>בדיקה 3</div>
        <div key="4" data-grid={{ x: 1, y: 3, w: 8, h: 2, minW: 2, maxW: 8 }}>בדיקה 4</div>
      </ResponsiveGridLayout>
    );
  }
}

const PageGrid = () => {
  const [grid, setGrid] = useState<GridStack>();
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


  // useEffect(() => {
  //   const newGrid = GridStack.init({
  //     float: false,
  //     resizable: { handles: 's,sw,w' },
  //     removable: '#clearPage',
  //     rtl: true,
  //     margin: 5,
  //     handle: '.block-handle',
  //     column: 'auto',
  //     cellHeight: 50
  //   });

  //   setGrid(newGrid);
  // }, []);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    console.log(newWidgetRequest);
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addText() {
    grid.addWidget({
      w: 3,
      content: <GridBlock></GridBlock>,
    });
  }

  function addPicture() {
    // const id = Date.now();
    // const html = `<div class="actionsArea"><input type="file" class="picturePicker" accept="image/*"></div>`;
    // const block = blockData(html, id, 'Picture', 6);
    // grid.addWidget(block);
    //createPicture(id, '');
  }

  function addGgb() {
    const id = Date.now();
    const html = 
      <Geogebra
        id={id.toString()}
        width={800}
        height={600}
        showMenuBar
        showToolBar
        showAlgebraInput
        appletOnLoad={() => console.log('appletOnLoad')}
      />

    const block = blockData(
      html,
      id,
      'Graph',
      1
    );
    grid.addWidget(block);
  }

  function addMath() {
    console.error('not implemented');
  }
  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    const id = Date.now();
    const html = <hr className='pageDivider' />;
    const block = blockData(
      html,
      id,
      'Divider',
      1,
      {},
      12,
      1000,
      12,
      1,
      1,
      1,
      12,
    );
    grid.addWidget(block);
  }

  return (
    <div className='grid-container'>
      <Grid />
      {/* <div className='grid-stack'></div> */}
    </div>
  );
};

export default PageGrid;
