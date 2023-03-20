import React, { useEffect, useState } from 'react';
import '../Application.scss';

import './Page.scss';

import ToolsPanel from './ToolsPanel/ToolsPanel';
import './ToolsPanel/ToolsPanel.scss';

import { useGeneralContext } from '@components/GeneralContext';
import PagePlaceholder from './PagePlaceholder';
import PageGrid from './Grid/Grid';

const gridStyle = {
  width: '100%',
  height: '100%',
  backgroundImage:
    'radial-gradient(circle at 50% 100%, var(--tool-hover-bgcolor) 1px, transparent 1px)',
  backgroundSize: '50px 50px',
  color: 'white'
};

const Page = () => {
  const { selectedFile } = useGeneralContext();
  const [currentFilePath, setCurrentFilePath] = useState("")

  useEffect(() => {
    setCurrentFilePath(selectedFile)
  }, [selectedFile])

  return (
    <div className='page' style={gridStyle}>
      { currentFilePath ?
        <div className='page-grid'>
          <PageGrid />
          <ToolsPanel />
        </div> : <PagePlaceholder/>
      }
    </div>
  );
};

export default Page;
