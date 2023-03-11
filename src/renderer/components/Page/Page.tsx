import React, { useEffect, useState } from 'react';
import '../Application.scss';

import PageGrid from './Grid/Grid';
import './Page.scss';

import ToolsPanel from './ToolsPanel/ToolsPanel';
import './ToolsPanel/ToolsPanel.scss';

import { useGeneralContext } from '@components/GeneralContext';


const Page = () => {
  const { selectedFile } = useGeneralContext();
  const [currentFilePath, setCurrentFilePath] = useState("")

  useEffect(() => {
    setCurrentFilePath(selectedFile)
  }, [selectedFile])

  return (
    <div className='page'>
      { currentFilePath ?
        <div className='page-grid'>
          <PageGrid />
          <ToolsPanel />
        </div> : <></>
      }
    </div>
  );
};

export default Page;
