import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { newWidgetRequest } from '@renderer/common/types';
import i18n from '@common/i18n';
import { Action, KBarProvider } from 'kbar';
import useSettings from '@renderer/hooks/useSettings';

const GeneralContext = createContext(null);

function GeneralContextProvider({ children }: PropsWithChildren) {
  const [saveRequest, setSaveRequest] = useState({ cmd: '' });
  const [clearPageRequest, setClearPageRequest] = useState({ cmd: '' });
  const [newWidgetRequest, setNewWidgetRequest] = useState<newWidgetRequest>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [currentFileTags, setCurrentFileTags] = useState<string[]>([]);

  const {
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
  } = useSettings();

  const setColor = (name: string, hue: number) => {
    localStorage.setItem('color', name);
    document.documentElement.style.setProperty('--theme-hue', hue.toString());
  };

  const setLang = (language: string) => {
    i18n.changeLanguage(language);
    setLanguage(language);

    localStorage.setItem('language', language);
    if (isRtlLang(language)) {
      document.querySelector('#main-app').classList.add('rtl');
    } else {
      document.querySelector('#main-app').classList.remove('rtl');
    }
  };

  const isRtlLang = (language: string) => {
    const rtlLanguages = ['he', 'ar', 'ur'];
    return rtlLanguages.includes(language);
  };

  const setTheme = (theme: number) => {
    localStorage.setItem('dark-mode', theme.toString());
    switch (theme) {
      case 0:
        document.body.classList.remove('dark-mode');
        break;

      case 1:
        document.body.classList.add('dark-mode');
        break;
    }
  };

  const actions: Action[] = [
    {
      id: 'preferences',
      name: i18n.t('Preferences'),
    },
    {
      id: 'language',
      name: i18n.t('Language'),
      parent: 'preferences',
    },
    {
      id: 'theme',
      name: i18n.t('Theme'),
      parent: 'preferences',
    },
    {
      id: 'color',
      name: i18n.t('Color'),
      parent: 'preferences',
    },
    {
      id: 'arabic',
      name: i18n.t('Arabic'),
      perform: () => {
        setLang('ar');
      },
      parent: 'language',
    },
    {
      id: 'english',
      name: i18n.t('English'),
      perform: () => {
        setLang('en');
      },
      parent: 'language',
    },
    {
      id: 'hebrew',
      name: i18n.t('Hebrew'),
      perform: () => {
        setLang('he');
      },
      parent: 'language',
    },
    {
      id: 'hindi',
      name: i18n.t('Hindi'),
      perform: () => {
        setLang('hi');
      },
      parent: 'language',
    },
    {
      id: 'mandarin Chinese',
      name: i18n.t('Mandarin Chinese'),
      perform: () => {
        setLang('zh');
      },
      parent: 'language',
    },
    {
      id: 'french',
      name: i18n.t('French'),
      perform: () => {
        setLang('fr');
      },
      parent: 'language',
    },
    {
      id: 'russian',
      name: i18n.t('Russian'),
      perform: () => {
        setLang('ru');
      },
      parent: 'language',
    },
    {
      id: 'spanish',
      name: i18n.t('Spanish'),
      perform: () => {
        setLang('es');
      },
      parent: 'language',
    },
    {
      id: 'blue',
      name: i18n.t('Blue'),
      perform: () => {
        setColor('blue', 210);
      },
      parent: 'color',
    },
    {
      id: 'pink',
      name: i18n.t('Pink'),
      perform: () => {
        setColor('pink', 300);
      },
      parent: 'color',
    },
    {
      id: 'yellow',
      name: i18n.t('Yellow'),
      perform: () => {
        setColor('yellow', 35);
      },
      parent: 'color',
    },
    {
      id: 'purple',
      name: i18n.t('Purple'),
      perform: () => {
        setColor('purple', 250);
      },
      parent: 'color',
    },
    {
      id: 'red',
      name: i18n.t('Red'),
      perform: () => {
        setColor('red', 0);
      },
      parent: 'color',
    },
    {
      id: 'green',
      name: i18n.t('Green'),
      perform: () => {
        setColor('green', 140);
      },
      parent: 'color',
    },
    {
      id: 'light',
      name: i18n.t('Light'),
      perform: () => {
        setTheme(0);
      },
      parent: 'theme',
    },
    {
      id: 'dark',
      name: i18n.t('Dark'),
      perform: () => {
        setTheme(1);
      },
      parent: 'theme',
    },
  ];

  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }

    if (!localStorage.getItem('all-tags'))
      localStorage.setItem('all-tags', JSON.stringify([]));

    if (!localStorage.getItem('color')) localStorage.setItem('color', 'blue');
    setColorTheme(localStorage.getItem('color'));

    if (!localStorage.getItem('language'))
      localStorage.setItem('language', 'he');
    setLanguage(localStorage.getItem('language'));
  }, []);

  useEffect(() => {
    if (darkTheme) {
      setTheme(1);
    } else {
      setTheme(0);
    }
  }, [darkTheme]);

  useEffect(() => {
    setLang(language);
  }, [language]);

  useEffect(() => {
    switch (colorTheme) {
      case 'red':
        setColor('red', 0);
        break;
      case 'yellow':
        setColor('yellow', 35);
        break;
      case 'green':
        setColor('green', 140);
        break;
      case 'blue':
        setColor('blue', 210);
        break;
      case 'purple':
        setColor('purple', 250);
        break;
      case 'pink':
        setColor('pink', 300);
        break;

      default:
        break;
    }
  }, [colorTheme]);

  useEffect(() => {
    window.api.getOS();

    window.api.receive('gotOS', (data: string) => {
      setCurrentOS(data);
    });
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        newWidgetRequest,
        setNewWidgetRequest,
        clearPageRequest,
        setClearPageRequest,
        selectedFile,
        setSelectedFile,
        saveRequest,
        setSaveRequest,
        currentFileTags,
        setCurrentFileTags,
        isMathSidebarOpen,
        setIsMathSidebarOpen,
        isFilesSidebarOpen,
        setIsFilesSidebarOpen,
        isRtl,
        setIsRtl,
        language,
        setLang,
        darkTheme,
        setTheme,
        colorTheme,
        setColor,
        actions,
        currentOS,
      }}
    >
      <KBarProvider
        actions={actions}
        options={{ toggleShortcut: '$mod+Shift+p' }}
      >
        {children}
      </KBarProvider>
    </GeneralContext.Provider>
  );
}

function useGeneralContext() {
  const context = useContext(GeneralContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

export { GeneralContextProvider, useGeneralContext };
