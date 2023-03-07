import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '@components/GeneralContext';
import { newWidgetRequest, WidgetType } from '@renderer/common/types';

import '../Page.scss';
import './Grid.scss';
import './Blocks/Blocks.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Responsive, WidthProvider } from 'react-grid-layout';
import Modal from '@components/common/Modal';
import GridElement from './GridElement';
const ResponsiveGridLayout = WidthProvider(Responsive);

const PageGrid = () => {
  const [state, setState] = useState({
    items: [],
  });

  const [areYouSureDeleteDialogOpen, setAreYouSureDeleteDialogOpen] =
    useState(false);

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setState((prev) => ({ ...prev, breakpoint, cols }));
  };

  const onLayoutChange = (layout: ReactGridLayout.Layout[]) => {
    setState((prev) => ({ ...prev, layout }));
  };

  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    if (clearPageRequest?.cmd === 'clear') setAreYouSureDeleteDialogOpen(true);
  }, [clearPageRequest]);

  const handleConfirm = () => {
    setAreYouSureDeleteDialogOpen(false);
    setState((prev) => ({
      ...prev,
      items: [],
    }));
  };

  const handleCancel = () => {
    setAreYouSureDeleteDialogOpen(false);
  };

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addText() {
    setState((prev) => ({
      items: [
        ...prev.items,
        {
          type: WidgetType.Text,
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 2,
        },
      ],
    }));
  }

  function addDraw() {
    setState((prev) => ({
      items: [
        ...prev.items,
        {
          type: WidgetType.Draw,
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 6,
          minH: 4,
          minW: 4,
        },
      ],
    }));
  }

  function addPicture() {
    console.error('not implemented');
  }

  function addGgb() {
    setState((prev) => ({
      items: [
        ...prev.items,
        {
          type: WidgetType.Graph,
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 6,
        },
      ],
    }));
  }

  function addMath() {
    setState((prev) => ({
      items: [
        ...prev.items,
        {
          type: WidgetType.Math,
          i: crypto.randomUUID(),
          x: Infinity,
          y: Infinity,
          w: 8,
          h: 2,
        },
      ],
    }));
  }

  function addGroup() {
    console.error('not implemented');
  }

  function addDivider() {
    setState((prev) => ({
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
        },
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
    window.api.loadX();
  };

  const saveGridData = () => {
    const data = JSON.stringify(state.items);
    window.api.saveX(data);
  };

  useEffect(() => {
    window.api.receive('gotLoadedDataX', (data) => {
      const x = JSON.parse(data);
      console.log(x);
      setState((prev) => ({ ...prev, items: [x] }));
    });
  }, []);

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
        {state.items.map((el) => (
          <GridElement
            el={el}
            widgetType={el.type}
            onRemoveItem={onRemoveItem}
            key={el.i}
          />
        ))}
      </ResponsiveGridLayout>

      <Modal
        open={areYouSureDeleteDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        האם למחוק את תכולת הדף?
      </Modal>
    </div>
  );
};

export default PageGrid;
