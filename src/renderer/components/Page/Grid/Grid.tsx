import '../Page.scss';
import React, { useContext, useEffect, useState } from 'react';
import { GridStack, GridStackWidget } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import GridBlock from './Block';
import { renderToString } from 'react-dom/server';
import { MyContext } from '@components/ContextApi';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';
import Geogebra from 'react-geogebra';

function blockData(
  html: string,
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
    idd: id,
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
  const [grid, setGrid] = useState<GridStack>();
  const { newWidgetRequest } = useContext(MyContext);

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

  const state = {
    items: [
      { x: 12, y: 1, w: 12, content: renderToString(<GridBlock>1</GridBlock>) },
      { x: 12, y: 2, w: 12, content: renderToString(<GridBlock>2</GridBlock>) },
      { x: 12, y: 3, w: 12, content: renderToString(<GridBlock>3</GridBlock>) },
      {
        x: 12,
        y: 4,
        w: 12,
        h: 2,
        content: renderToString(<GridBlock>4</GridBlock>),
      },
    ],
  };

  useEffect(() => {
    const newGrid = GridStack.init({
      float: false,
      resizable: { handles: 's,sw,w' },
      removable: '#clearPage',
      rtl: true,
      margin: 5,
      handle: '.block-handle',
      column: 'auto',
      cellHeight: 50,
      children: state.items,
    });

    setGrid(newGrid);
  }, []);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    console.log(newWidgetRequest);
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addText() {
    grid.addWidget({
      w: 3,
      content: renderToString(<GridBlock></GridBlock>),
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
    const html = renderToString(
      <Geogebra
        id={id.toString()}
        width={800}
        height={600}
        showMenuBar
        showToolBar
        showAlgebraInput
        appletOnLoad={() => console.log('appletOnLoad')}
      />,
    );

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

  function addMath() {
    console.error('not implemented');
  }
  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    const id = Date.now();
    const html = renderToString(<hr className='pageDivider' />);
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
      <div className='grid-stack'></div>
    </div>
  );
};

export default PageGrid;
