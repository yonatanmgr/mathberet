import React, {
  createContext,
  PropsWithChildren,
  useContext,
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
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRtl, setIsRtl] = useState(true);

  return (
    <GeneralContext.Provider
      value={{
        newWidgetRequest, setNewWidgetRequest,
        clearPageRequest, setClearPageRequest,
        selectedFile, setSelectedFile,
        saveRequest, setSaveRequest,
        currentFileTags, setCurrentFileTags,
        isLeftSidebarOpen, setIsLeftSidebarOpen,
        isRightSidebarOpen, setIsRightSidebarOpen,
        isRtl, setIsRtl
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
