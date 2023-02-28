import React from 'react';
import './Page.scss';
import '../Application.scss';
import PageGrid from './Grid/Grid';
import ToolsPanel from './ToolsPanel';
import 'react-grid-layout/css/styles.css'
import "react-resizable/css/styles.css"


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
