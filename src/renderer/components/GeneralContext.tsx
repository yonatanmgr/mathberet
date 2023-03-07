import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { newWidgetRequest } from '@renderer/common/types';

const GeneralContext = createContext(null);

function GeneralContextProvider({ children }: PropsWithChildren) {
  const [newWidgetRequest, setNewWidgetRequest] = useState<newWidgetRequest>();
  const [clearPageRequest, setClearPageRequest] = useState({cmd:{}});

  return (
    <GeneralContext.Provider
      value={{
        newWidgetRequest,
        setNewWidgetRequest,
        clearPageRequest,
        setClearPageRequest,
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
