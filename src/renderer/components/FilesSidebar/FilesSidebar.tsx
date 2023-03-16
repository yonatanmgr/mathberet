import React from 'react';
import './FilesSidebar.scss';
import SidebarButton from './SidebarButton';
import FileSystem from './FileSystem';
import { useKBar } from 'kbar';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';

const FilesSidebar = () => {
  const { t, i18n } = useTranslation();

  const { query } = useKBar();
  const {
    setIsMathSidebarOpen,
    setIsFilesSidebarOpen,
    isMathSidebarOpen,
    isFilesSidebarOpen,
  } = useGeneralContext();

  const handleOnClickFiles = () => {
    setIsFilesSidebarOpen((isFilesSidebarOpen: boolean) => !isFilesSidebarOpen);
  };

  const handleOnClickMathPanel = () => {
    setIsMathSidebarOpen((isMathSidebarOpen: boolean) => !isMathSidebarOpen);
  };

  return (
    <div className={`files-sidebar${isFilesSidebarOpen ? ' open' : ''}`}>
      <div className='basic'>
        <section id='top'>
          <SidebarButton
            title={t('My Notebooks')}
            buttonType='files'
            state={isFilesSidebarOpen}
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
            state={isMathSidebarOpen}
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
      {isFilesSidebarOpen && (
        <section className='extension'>
          <FileSystem />
        </section>
      )}
    </div>
  );
};

export default FilesSidebar;
