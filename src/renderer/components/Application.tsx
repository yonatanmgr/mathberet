import React, { useEffect, useState } from 'react';
import './Application.scss';
import Page from './Page/Page';
import RightSidebar from './RightSideBar/RightSidebar';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import Header from './Header/Header';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import KBar from './RightSideBar/KBar';
import { GeneralContextProvider } from './GeneralContext';

const Application = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [colorTheme, setColorTheme] = useState("");

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

  useEffect(() => {
    setColorTheme(localStorage.getItem('color'));
  }, []);

  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = document.documentElement;
    switch (colorTheme) {
      case 'blue':
        localStorage.setItem('color', 'blue');
        root.style.setProperty('--theme-hue', '200')  
        break;

      case 'red':
        localStorage.setItem('color', 'red');
        root.style.setProperty('--theme-hue', '0')  
        break;

      case 'yellow':
        localStorage.setItem('color', 'yellow');
        root.style.setProperty('--theme-hue', '35')  
        break;

      case 'green':
        localStorage.setItem('color', 'green');
        root.style.setProperty('--theme-hue', '140')  
        break;

      case 'purple':
        localStorage.setItem('color', 'purple');
        root.style.setProperty('--theme-hue', '245')  
        break;

      default:
        break;
    }
  }, [colorTheme]);

  return (
    <GeneralContextProvider>
      <div id='erwt'>
        <Header />
        <div className='workspace'>
          <RightSidebar />
          <KBar />
          <Page />
          <LeftSidebar />
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Application;
