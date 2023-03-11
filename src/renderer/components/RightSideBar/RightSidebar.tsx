import React, { useState } from 'react';
import './RightSidebar.scss';
import SidebarButton from './SidebarButton';
import FileSystem from './FileSystem';
import { useKBar } from 'kbar';

const RightSidebar = () => {
  const { query } = useKBar();
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  const handleOnClickFiles = () => {
    setIsRightSidebarOpen((isRightSidebarOpen) => !isRightSidebarOpen);
  };

  const handleOnClickMathPanel = () => {
    setIsLeftSidebarOpen((isLeftSidebarOpen) => !isLeftSidebarOpen);
    //todo: should be refactored to React way
    document.querySelector('.left-sidebar').classList.toggle('open');
  };

  return (
    <div className={'right-sidebar' + (isRightSidebarOpen ? ' open' : '')}>
      <div className='basic'>
        <section id='top'>
          <SidebarButton
            title='המחברות שלי'
            buttonType='files'
            state={isRightSidebarOpen}
            icon='notebook'
            onClick={handleOnClickFiles}
          />
          <SidebarButton
            title='חיפוש ופעולות'
            buttonType='search'
            icon='terminal'
            onClick={() => query.toggle()}
          />
        </section>
        <section id='bottom'>
          <SidebarButton
            title='זיכרון מתמטי'
            buttonType='mathPanel'
            state={isLeftSidebarOpen}
            icon='calculator'
            onClick={handleOnClickMathPanel}
          />
          <SidebarButton
            title='הארכיון שלי'
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
