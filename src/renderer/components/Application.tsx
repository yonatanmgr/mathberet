import React from 'react';
import './Application.scss';
import Page from './Page/Page';
import RightSidebar from './RightSideBar/RightSidebar';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import Header from './Header/Header';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'
import KBar from './RightSideBar/KBar';

const Application: React.FC = () => {
  return (
    <div id='erwt'>
      <Header />
      <div className='workspace'>
        <RightSidebar />
        <KBar />
        <Page />
        <LeftSidebar />
      </div>
    </div>
  );
};

export default Application;
