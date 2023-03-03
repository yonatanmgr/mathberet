import '../Page.scss';
import React, { useContext, useEffect, useState } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.css';
import GridBlock from './Block';
import { renderToString } from 'react-dom/server';
import { MyContext } from '@components/ContextApi';

const PageGrid = () => {
  const [grid, setGrid] = useState<GridStack>();
  const { newWidget } = useContext(MyContext);

  useEffect(() => {
    if (newWidget) AddWidget(newWidget);
  }, [newWidget]);

  const state = {
    items: [
      { x: 12, y: 1, w: 12, content: renderToString(<GridBlock>1</GridBlock>) },
      { x: 12, y: 2, w: 12, content: renderToString(<GridBlock>2</GridBlock>) },
      { x: 12, y: 3, w: 12, content: renderToString(<GridBlock>3</GridBlock>) },
      { x: 12, y: 4, w: 12, h: 2, content: renderToString(<GridBlock>4</GridBlock>) },
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

  const AddWidget = (newWidget: any) => {

    console.log(newWidget)

    grid.addWidget({
      w: 3,
      content: renderToString(<GridBlock>{newWidget.type}</GridBlock>),
    });
  };

  return (
    <div className='grid-container'>
      <div className='grid-stack'></div>
    </div>
  );
};

export default PageGrid;
