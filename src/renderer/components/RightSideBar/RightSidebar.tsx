import { icons } from '@components/Icons';
import React, { useState } from 'react';
import './RightSidebar.scss';
import SidebarButton from './SidebarButton';
import FileSystem from './FileSystem';

const RightSidebar = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const handleOnClickFiles = () => {
    setIsRightSidebarOpen((isRightSidebarOpen) => !isRightSidebarOpen);
  };

  const handleOnClickMathPanel = () => {
    //todo: should be refactored to React way
    document.querySelector('.left-sidebar').classList.toggle('open');
  };

  return (
    <div className={'right-sidebar' + (isRightSidebarOpen ? ' open' : '')}>
      <div className='basic'>
        <section id='top'>
          <SidebarButton
            title='חיפוש'
            buttonType='search'
            icon={icons.search}
          />
          <SidebarButton
            title='המחברות שלי'
            buttonType='files'
            icon={icons.notebook}
            onClick={handleOnClickFiles}
          />
        </section>
        <section id='bottom'>
          <SidebarButton
            title='זיכרון מתמטי'
            buttonType='mathPanel'
            icon={icons.mathPanel}
            onClick={handleOnClickMathPanel}
          />
          <SidebarButton
            title='הארכיון'
            buttonType='archive'
            icon={icons.archive}
          />
          <SidebarButton
            title='העדפות'
            buttonType='settings'
            icon={icons.settings}
          />
        </section>
      </div>
      {isRightSidebarOpen && <section className='extension'>
      <FileSystem/>
      </section>}
    </div>
  );
};

export default RightSidebar;
