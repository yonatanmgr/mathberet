import React, { useEffect, useState } from 'react';
import { useGeneralContext } from '@components/GeneralContext';

import { Notification } from '@components/common/Notification';
import ConfirmModal from '@components/common/Modals/ConfirmModal';

import { BlockElement, CustomLayouts } from '@renderer/common/types';

import '@components/Page/Page.scss';
import '@components/Page/Grid/Grid.scss';
import '@components/Page/Grid/Blocks/Blocks.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import GridElement from './GridElement';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { useAddBlock } from '@renderer/hooks/useAddBlock';
import { useDialog } from '@renderer/hooks/useDialog';
import { useFileSaveLoad } from '@renderer/hooks/useFileSaveLoad';
import { useTranslation } from 'react-i18next';

const ResponsiveGridLayout = WidthProvider(Responsive);

const PageGrid = () => {
  const { t, i18n } = useTranslation();
  const [breakpoint, setBreakpoint] = useState('')
  const [layouts, setLayouts] = useState<CustomLayouts>({})
  const [allBlockValues, setAllBlockValues] = useState([]);
  const [popupType, setPopupType] = useState('');
  const [clearModalOpen, setClearModalOpen] = useState(false);

  const { isFilesSidebarOpen, isMathSidebarOpen } = useGeneralContext();

  useEffect(
    function adjustGridWidth() {
      setTimeout(() => {
        dispatchEvent(new Event('resize'));
      }, 300);
    },
    [isFilesSidebarOpen, isMathSidebarOpen],
  );

  useFileSaveLoad(
    layouts[breakpoint],
    setLayouts,
    allBlockValues,
    setAllBlockValues,
    setPopupType,
  );

  useAddBlock(setLayouts);

  const ModalChoice = useDialog(setLayouts, setAllBlockValues, setClearModalOpen);

  const onLayoutChange = (layout: BlockElement[], layouts: CustomLayouts) => {
    layout.map((block) => {
      block.type = layouts[breakpoint].find((item) => item.i == block.i).type;
      block.metaData = layouts[breakpoint].find((item) => item.i == block.i).metaData;
    });

    setLayouts(layouts)
  };

  const onBreakpointChange = (breakpoint: string, cols: number) => {
    setBreakpoint(breakpoint)
  };

  const onRemoveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLayouts((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => item.i !== (e.target as HTMLTextAreaElement).name,
      ),
    }));

    setAllBlockValues((allValues) =>
      allValues.filter(
        (value) => value.id !== (e.target as HTMLTextAreaElement).name,
      ),
    );
  };

  return (
    <div className='grid-container'>
      <ResponsiveGridLayout
        cols={{ lg: 8, md: 6, sm: 4, xs: 2, xss: 1 }}
        breakpoints={{ lg: 800, md: 600, sm: 400, xs: 200, xss: 100 }}
        layouts={layouts}
        onLayoutChange={(layout: BlockElement[], layouts: CustomLayouts) =>
          onLayoutChange(layout, layouts)
        }
        onBreakpointChange={onBreakpointChange}
        className='layout'
        rowHeight={50}
        resizeHandles={
          document.querySelector('#main-app').classList.contains('rtl')
          ? ['sw']
          : ['se']
        }
        containerPadding={[0, 0]}
        draggableHandle='.block-handle'
      >
        {layouts[breakpoint].map((element) => (
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
        open={clearModalOpen}
        onConfirm={ModalChoice.handleDialogConfirm}
        onCancel={ModalChoice.handleDialogCancel}
        text={t('Modal 1')}
      />

      <Notification scene={popupType} />
    </div>
  );
};

export default PageGrid;
