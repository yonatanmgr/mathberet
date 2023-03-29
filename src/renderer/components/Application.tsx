import React from 'react';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './Application.scss';
import { CommandBar } from './CommandBar/CommandBar';
import FilesSidebar from './FilesSidebar/FilesSidebar';
import { GeneralContextProvider } from './GeneralContext';
import Header from './Header/Header';
import MathSidebar from './MathSidebar/MathSidebar';
import Page from './Page/Page';

const Application = () => {
  return (
    <GeneralContextProvider>
      <div id='main-app'>
        <Header />
        <div className='workspace'>
          <FilesSidebar />
          <CommandBar />
          <Page />
          <MathSidebar />
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Application;
