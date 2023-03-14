import React from 'react';
import './RightSidebar.scss';
import SidebarButton from './SidebarButton';
import FileSystem from './FileSystem';
import { useKBar } from 'kbar';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';

const RightSidebar = () => {
  const { t, i18n } = useTranslation();

  const { query } = useKBar();
  const {
    setIsLeftSidebarOpen,
    setIsRightSidebarOpen,
    isLeftSidebarOpen,
    isRightSidebarOpen,
  } = useGeneralContext();

  const handleOnClickFiles = () => {
    setIsRightSidebarOpen((isRightSidebarOpen: boolean) => !isRightSidebarOpen);
  };

  const handleOnClickMathPanel = () => {
    setIsLeftSidebarOpen((isLeftSidebarOpen: boolean) => !isLeftSidebarOpen);
  };

  return (
    <div className={`right-sidebar${isRightSidebarOpen ? ' open' : ''}`}>
      <div className='basic'>
        <section id='top'>
          <SidebarButton
            title={t('My Notebooks')}
            buttonType='files'
            state={isRightSidebarOpen}
            icon='notebook'
            onClick={handleOnClickFiles}
          />
          <SidebarButton
            title={t('Command Bar')}
            buttonType='search'
            icon='terminal'
            onClick={() => query.toggle()}
          />
        </section>
        <section id='bottom'>
          <SidebarButton
            title={t('Math Panel')}
            buttonType='mathPanel'
            state={isLeftSidebarOpen}
            icon='calculator'
            onClick={handleOnClickMathPanel}
          />
          <SidebarButton
            title={t('Archive')}
            buttonType='archive'
            icon='archive'
          />
        </section>
      </div>
      {isRightSidebarOpen && (
        <section className='extension'>
          <FileSystem />
        </section>
      )}
    </div>
  );
};

export default RightSidebar;
