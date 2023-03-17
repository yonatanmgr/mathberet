import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { newWidgetRequest } from '@renderer/common/types';

const GeneralContext = createContext(null);

function GeneralContextProvider({ children }: PropsWithChildren) {
  const [saveRequest, setSaveRequest] = useState({ cmd: '' });
  const [clearPageRequest, setClearPageRequest] = useState({ cmd: '' });
  const [newWidgetRequest, setNewWidgetRequest] = useState<newWidgetRequest>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [currentFileTags, setCurrentFileTags] = useState<string[]>([]);
  const [isFilesSidebarOpen, setIsFilesSidebarOpen] = useState(false);
  const [isMathSidebarOpen, setIsMathSidebarOpen] = useState(false);
  const [isRtl, setIsRtl] = useState(true);
  const [currentOS, setCurrentOS] = useState('');

  useEffect(() => {  
    window.api.getOS();
  }, [])

  useEffect(() => {  
    window.api.receive('gotOS', (data: string) => {
      setCurrentOS(data);
    });
  }, [])
  

  return (
    <GeneralContext.Provider
      value={{
        newWidgetRequest, setNewWidgetRequest,
        clearPageRequest, setClearPageRequest,
        selectedFile, setSelectedFile,
        saveRequest, setSaveRequest,
        currentFileTags, setCurrentFileTags,
        isMathSidebarOpen, setIsMathSidebarOpen,
        isFilesSidebarOpen, setIsFilesSidebarOpen,
        isRtl, setIsRtl,
        currentOS
      }}
    >
      {children}
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
