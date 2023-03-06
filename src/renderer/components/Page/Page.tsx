import React from 'react';
import '../Application.scss';

import PageGrid from './Grid/Grid';
import './Page.scss';



import ToolsPanel from './ToolsPanel/ToolsPanel';
import './ToolsPanel/ToolsPanel.scss'



const Page = () => {
  return (
    <div className='page'>
      <div className='page-grid'>
        <PageGrid />
        <ToolsPanel />
      </div>
    </div>
  );
};

export default Page;
