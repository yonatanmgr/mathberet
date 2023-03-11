import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '@components/GeneralContext';
import {
  BlockElement,
  FileStructure,
  newWidgetRequest,
  WidgetType,
} from '@renderer/common/types';
import Notification from '../../common/Notification';

import '../Page.scss';
import './Grid.scss';
import './Blocks/Blocks.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Responsive, WidthProvider } from 'react-grid-layout';
import ConfirmModal from '@components/common/Modals/ConfirmModal';
import GridElement from './GridElement';
import { any } from 'prop-types';

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
    cols: 8,
  });

  const [allValues, setAllValues] = useState([]);

  const [popupType, setPopupType] = useState('');

  const [areYouSureDeleteDialogOpen, setAreYouSureDeleteDialogOpen] =
    useState(false);

  const {
    selectedFile,
    newWidgetRequest,
    clearPageRequest,
    saveRequest,
    currentFileTags,
    setCurrentFileTags,
  } = useGeneralContext();

  useEffect(() => {
    if (newWidgetRequest) AddWidget(newWidgetRequest);
  }, [newWidgetRequest]);

  useEffect(() => {
    if (clearPageRequest?.cmd === 'clear') setAreYouSureDeleteDialogOpen(true);
  }, [clearPageRequest]);

  useEffect(() => {
    window.api.receive('gotLoadedDataX', (data: string) => {
      if (!data) {
        setState((prev) => ({ ...prev, items: [] }));
        return;
      }

      const parsedData = JSON.parse(data)

      const blocksData: Array<BlockElement> = parsedData.blocks;
      parsedData.tags
        ? setCurrentFileTags(JSON.parse(data).tags)
        : setCurrentFileTags([]);

      if (!Array.isArray(blocksData)) {
        setState((prev) => ({ ...prev, items: [] }));
        return;
      }

      blocksData.map((block: BlockElement) => {
        if (block.y == null) {
          block.y = Infinity;
        }
        if (block.x == null) {
          block.x = Infinity;
        }
      });

      setState((prev) => ({ ...prev, items: blocksData }));

      let newData: Array<object> = blocksData;
      newData = newData.map((block: BlockElement) => {
        return { id: block.i, metaData: block.metaData };
      });

      setAllValues(newData);
    });
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) window.api.loadX(selectedFile);
  }, [selectedFile]);

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setState((prev) => ({ ...prev, breakpoint, cols }));
  };

  const onLayoutChange = (layout: Array<BlockElement>) => {
    layout.map((block) => {
      block.type = state.items.find((item) => {
        return item.i == block.i;
      }).type;
      block.metaData = state.items.find((item) => {
        return item.i == block.i;
      }).metaData;
    });

    setState((prev) => ({ ...prev, items: layout }));
  };

  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.i !== e.target.name),
    }));

    setAllValues((allValues) =>
      allValues.filter((value) => value.id !== e.target.name),
    );
  };

  const handleConfirm = () => {
    setAreYouSureDeleteDialogOpen(false);
    setState((prev) => ({ ...prev, items: [] }));
    setAllValues([]);
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

  const saveMetaData = (block: BlockElement) => {
    const found = allValues.find((state) => state.id == block.i).metaData;

    block.metaData = {
      content: found.content,
      blockStateFunction: () => any,
    };
  };

  const saveGridData = () => {
    const currentItems = state.items;
    currentItems.map(saveMetaData);

    const fileData: FileStructure = {
      blocks: currentItems,
      tags: currentFileTags,
      mathMemory: {},
    };

    window.api.saveX(JSON.stringify(fileData), selectedFile);
  };

  const popupAnimation = (type: string) => {
    setTimeout(() => {
      setPopupType(type);
      setTimeout(() => {
        setPopupType('');
      }, 1200);
    }, 0);
  };

  useEffect(() => {
    if (saveRequest?.cmd === 'save') {
      if (selectedFile) {
        try {
          saveGridData();
          popupAnimation('save');
        } catch (error) {
          popupAnimation('error');
          console.error(error);
        }
      } else popupAnimation('firstSelect');
    }
  }, [saveRequest]);

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
        {state.items.map((element) => (
          <GridElement
            blockElement={element}
            onRemoveItem={onRemoveItem}
            key={element.i}
            data-grid={element}
            blockValue={element.metaData}
            setValuesFunction={setAllValues}
            allValues={allValues}
          />
        ))}
      </ResponsiveGridLayout>
      <Notification scene={popupType} />
      <ConfirmModal
        open={areYouSureDeleteDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        האם למחוק את תכולת הדף?
      </ConfirmModal>
    </div>
  );
};

export default PageGrid;
