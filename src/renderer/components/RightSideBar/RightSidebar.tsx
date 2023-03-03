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
            title='המחברות שלי'
            buttonType='files'
            icon='notebook'
            onClick={handleOnClickFiles}
          />
          <SidebarButton title='חיפוש' buttonType='search' icon='terminal' />
        </section>
        <section id='bottom'>
          <SidebarButton
            title='זיכרון מתמטי'
            buttonType='mathPanel'
            icon='calculator'
            onClick={handleOnClickMathPanel}
          />
          <SidebarButton title='הארכיון' buttonType='archive' icon='archive' />
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
