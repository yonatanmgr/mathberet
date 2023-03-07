import React, { useEffect, useState } from 'react';
import { Node } from 'slate';
import { useGeneralContext } from '@components/GeneralContext';
import {
  BlockElement,
  newWidgetRequest,
  WidgetType,
} from '@renderer/common/types';

import '../Page.scss';
import './Grid.scss';
import './Blocks/Blocks.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Responsive, WidthProvider } from 'react-grid-layout';
import Modal from '@components/common/Modal';
import GridElement from './GridElement';

const ResponsiveGridLayout = WidthProvider(Responsive);

type PageGridState = {
  items: BlockElement[];
  breakpoint: string;
  cols: number;
};

const PageGrid = () => {

  const [state, setState] = useState<PageGridState>({
    items: [],
    breakpoint: 'lg',
    cols: 8
  });

  const [areYouSureDeleteDialogOpen, setAreYouSureDeleteDialogOpen] = useState(false);

  const { newWidgetRequest, clearPageRequest } = useGeneralContext();

  useEffect(() => {
    if (newWidgetRequest) AddWidget(newWidgetRequest);
  }, [newWidgetRequest]);

  useEffect(() => {
    if (clearPageRequest?.cmd === 'clear') setAreYouSureDeleteDialogOpen(true);
  }, [clearPageRequest]);

  useEffect(() => {
    window.api.receive('gotLoadedDataX', (data: string) => {

      const loadedData: Array<BlockElement> = JSON.parse(data);
      loadedData.map((block: BlockElement) => {
        if (block.y == null) { block.y = Infinity }
        if (block.x == null) { block.x = Infinity }
      })
      // console.log(loadedData);
      setState((prev) => ({ ...prev, items: loadedData }));
    });
  }, []);

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setState((prev) => ({ ...prev, breakpoint, cols }));
  };

  const onLayoutChange = (layout: Array<BlockElement>) => { 
    layout.map((block) => {
      block.type = state.items.find(item => {return item.i == block.i}).type
      block.metaData = state.items.find(item => {return item.i == block.i}).metaData
    })  
    
    setState((prev) => ({ ...prev, items: layout }));
  };

  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.i !== e.target.name),
    }));
  };

  const handleConfirm = () => {
    setAreYouSureDeleteDialogOpen(false);
    setState((prev) => ({...prev, items: []}));
  };

  const handleCancel = () => setAreYouSureDeleteDialogOpen(false);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addText() {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: WidgetType.Text,
          i: crypto.randomUUID(),
          metaData: {},
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 2,
        } as BlockElement,
      ],
    }));
  }

  function addDraw() {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: WidgetType.Draw,
          metaData: {},
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 6,
          minH: 4,
          minW: 4,
        } as BlockElement,
      ],
    }));
  }

  function addPicture() {
    console.error('not implemented');
  }

  function addGgb() {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: WidgetType.Graph,
          metaData: {},
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 6,
        } as BlockElement,
      ],
    }));
  }

  function addMath() {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: WidgetType.Math,
          metaData: {},
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 2,
        } as BlockElement,
      ],
    }));
  }

  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: WidgetType.Divider,
          maxH: 1,
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity, // puts it at the bottom
          w: 8,
          h: 1,
        } as BlockElement,
      ],
    }));
  }

  const addWidgetHandlersMap = new Map<WidgetType, () => void>([
    [WidgetType.Divider, addDivider],
    [WidgetType.Graph, addGgb],
    [WidgetType.Group, addGroup],
    [WidgetType.Text, addText],
    [WidgetType.Math, addMath],
    [WidgetType.Picture, addPicture],
    [WidgetType.Draw, addDraw],
  ]);

  const loadGridData = () => {
    setState(prev=>({...prev, items: []}))
    window.api.loadX()
  };

  const saveMetaData = (block: BlockElement) => {
    const foundContent = document.getElementById(block.i)    

    function saveSwitcher(widgetType: WidgetType) {
      switch (widgetType) {
        case WidgetType.Text:
          return {text: [{}]};
        case WidgetType.Math:
          return {latex: foundContent.querySelector(".math-field-element").getValue()};
        case WidgetType.Graph:
          return {plots: [foundContent.querySelector(".math-field-element").getValue()]};
        case WidgetType.Draw:
          return null;
        default:
          return null;
      }
    }

    block.metaData = {content: saveSwitcher(block.type)}
    // if (block.type == WidgetType.Text) console.log(block.metaData);
  }

  const saveGridData = () => {
    const currentItems = state.items
    currentItems.map(saveMetaData)
    const data = JSON.stringify(currentItems);

    window.api.saveX(data);
  };

  return (
    <div className='grid-container'>
      <button onClick={saveGridData}>Save</button>
      <button onClick={loadGridData}>Load</button>
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
        {state.items.map((element) => (
          <GridElement 
            blockElement={element} 
            onRemoveItem={onRemoveItem} 
            key={element.i} 
            data-grid={element}
            blockValue={element.metaData}
          />
        ))}
      </ResponsiveGridLayout>

      <Modal open={areYouSureDeleteDialogOpen} onConfirm={handleConfirm} onCancel={handleCancel}>
        האם למחוק את תכולת הדף?
      </Modal>
    </div>
  );
};

export default PageGrid;
