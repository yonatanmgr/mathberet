import React, { useEffect, useState } from 'react';
import './Application.scss';
import Page from './Page/Page';
import RightSidebar from './RightSidebar/RightSidebar';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import Header from './Header/Header';
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'


const Application: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  // function toggleTheme() {
  //   setDarkTheme(!darkTheme);
  // }

  return (
    <div id='erwt'>
      <Header />
      <div className='workspace'>
        <RightSidebar />
        <Page />
        <LeftSidebar />
      </div>
    </div>
  );
};

export default Application;
