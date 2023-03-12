import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '@components/GeneralContext';
import Notification from '@components/common/Notification';
import ConfirmModal from '@components/common/Modals/ConfirmModal';

import { any } from 'prop-types';
import {
  BlockElement,
  FileStructure,
  newWidgetRequest,
  WidgetType,
} from '@renderer/common/types';

import '@components/Page/Page.scss';
import '@components/Page/Grid/Grid.scss';
import '@components/Page/Grid/Blocks/Blocks.scss';
import GridElement from './GridElement';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
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

  const [allBlockValues, setAllBlockValues] = useState([]);
  const [popupType, setPopupType] = useState('');
  const [areYouSureDeleteDialogOpen, setAreYouSureDeleteDialogOpen] = useState(false);
  const {
    selectedFile,
    newWidgetRequest,
    clearPageRequest,
    saveRequest,
    currentFileTags,
    setCurrentFileTags,
    isRightSidebarOpen,
    isLeftSidebarOpen
  } = useGeneralContext();


  // Send resize event when opening and closing sidebars to fix block size bug
  useEffect(() => {
    setTimeout(() => {
      dispatchEvent(new Event('resize'));
    }, 300);
  }, [isRightSidebarOpen, isLeftSidebarOpen]);

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setState((prev) => ({ ...prev, breakpoint: breakpoint, cols: cols }));
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


  // Page clearing
  useEffect(() => {
    if (clearPageRequest?.cmd === 'clear') setAreYouSureDeleteDialogOpen(true);
  }, [clearPageRequest]);

  const handleDialogConfirm = () => {
    setAreYouSureDeleteDialogOpen(false);
    setState((prev) => ({ ...prev, items: [] }));
    setAllBlockValues([]);
  };

  const handleDialogCancel = () => setAreYouSureDeleteDialogOpen(false);


  // Block adding
  useEffect(() => {
    if (newWidgetRequest) AddWidget(newWidgetRequest);
  }, [newWidgetRequest]);

  const AddWidget = (newWidgetRequest: newWidgetRequest) => {
    const handler = addWidgetHandlersMap.get(newWidgetRequest.widgetType);
    if (handler) handler();
  };

  function addBlockByType(
    blockType: number,
    height: number,
    width?: number,
    minHeight?: number,
    minWidth?: number,
    maxHeight?: number,
    maxWidth?: number
  ) {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: blockType,
          i: crypto.randomUUID(),
          metaData: {},
          x: Infinity,
          y: Infinity,
          h: height,
          w: width ? width : 8,
          minH: minHeight ? minHeight : 1,
          minW: minWidth ? minWidth : 1,
          maxH: maxHeight ? maxHeight : 100,
          maxW: maxWidth ? maxWidth : 8,
        } as BlockElement,
      ],
    }));
  }

  const addWidgetHandlersMap = new Map<WidgetType, () => void>([
    [WidgetType.Divider, () => addBlockByType(WidgetType.Divider, 1, 8, 1, 1, 1)],
    [WidgetType.Graph, () => addBlockByType(WidgetType.Graph, 6, 8, 2, 2)],
    [WidgetType.Text, () => addBlockByType(WidgetType.Text, 2)],
    [WidgetType.Math, () => addBlockByType(WidgetType.Math, 2)],
    [WidgetType.Draw, () => addBlockByType(WidgetType.Draw, 6, 8, 4, 4)],
    [WidgetType.Picture, () => console.error('not implemented')],
    [WidgetType.Group, () => console.error('not implemented')],
  ]);


  // Block removing
  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.i !== e.target.name),
    }));

    setAllBlockValues((allValues) =>
      allValues.filter((value) => value.id !== e.target.name),
    );
  };
  

  // File loading
  useEffect(() => {
    if (selectedFile) window.api.loadX(selectedFile);
    window.api.receive('gotLoadedDataX', (data: string) => {
      if (!data) {
        setState((prev) => ({ ...prev, items: [] }));
        return;
      }

      const parsedData = JSON.parse(data);

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

      setAllBlockValues(newData);
    });
  }, [selectedFile]);


  // Block saving
  const saveMetaDataPerBlock = (block: BlockElement) => {
    const found = allBlockValues.find((state) => state.id == block.i).metaData;

    block.metaData = {
      content: found.content,
      blockStateFunction: () => any,
    };
  };

  const saveGridDataToFile = () => {
    const currentItems = state.items;
    currentItems.map(saveMetaDataPerBlock);

    const fileData: FileStructure = {
      blocks: currentItems,
      tags: currentFileTags,
      mathMemory: {},
    };

    window.api.saveX(JSON.stringify(fileData), selectedFile);
  };


  // File saving
  useEffect(() => {
    if (saveRequest?.cmd === 'save') {
      if (selectedFile) {
        try {
          saveGridDataToFile();
          triggerPopupAnimation('save');
        } catch (error) {
          triggerPopupAnimation('error');
          console.error(error);
        }
      } else triggerPopupAnimation('firstSelect');
    }
  }, [saveRequest]);


  const triggerPopupAnimation = (type: string) => {
    setTimeout(() => {
      setPopupType(type);
      setTimeout(() => {
        setPopupType('');
      }, 1200);
    }, 0);
  };

  return (
    <div className='grid-container'>
      <ResponsiveGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className='layout'
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xss: 1 }}
        rowHeight={50}
        resizeHandles={['sw']}
        containerPadding={[0, 0]}
        breakpoints={{ lg: 800, md: 600, sm: 400, xs: 200, xss: 100 }}
        draggableHandle='.block-handle'
      >
        {state.items.map((element) => (
          <GridElement
            blockElement={element}
            onRemoveItem={onRemoveItem}
            key={element.i}
            data-grid={element}
            blockValue={element.metaData}
            setValuesFunction={setAllBlockValues}
            allValues={allBlockValues}
          />
        ))}
      </ResponsiveGridLayout>

      <ConfirmModal
        open={areYouSureDeleteDialogOpen}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      >
        האם למחוק את תכולת הדף?
      </ConfirmModal>
      <Notification scene={popupType} />
    </div>
  );
};

export default PageGrid;
