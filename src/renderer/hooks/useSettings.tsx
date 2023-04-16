import { useState } from 'react';

function useSettings() {
  const [isRtl, setIsRtl] = useState(true);
  const [language, setLanguage] = useState('en');
  const [darkTheme, setDarkTheme] = useState(true);
  const [colorTheme, setColorTheme] = useState('');
  const [currentOS, setCurrentOS] = useState('');
  const [isFilesSidebarOpen, setIsFilesSidebarOpen] = useState(false);
  const [isMathSidebarOpen, setIsMathSidebarOpen] = useState(false);

  return {
    isRtl,
    setIsRtl,
    language,
    setLanguage,
    darkTheme,
    setDarkTheme,
    colorTheme,
    setColorTheme,
    currentOS,
    setCurrentOS,
    isFilesSidebarOpen,
    setIsFilesSidebarOpen,
    isMathSidebarOpen,
    setIsMathSidebarOpen,
  };
}
export default useSettings;
