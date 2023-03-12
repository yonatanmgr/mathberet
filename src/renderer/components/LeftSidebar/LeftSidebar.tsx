import React, { useEffect, useState } from 'react';
import ActionsGroup from './ActionsGroup';
import { useGeneralContext } from '@components/GeneralContext';

const LeftSidebar = () => {
  const { isLeftSidebarOpen } = useGeneralContext()
  const [showClass, setShowClass] = useState('');

  useEffect(() => {
    setShowClass(isLeftSidebarOpen);
  }, [isLeftSidebarOpen])

  return <div className={`left-sidebar${showClass ? ' open' : ''}`}>
    <ActionsGroup title='משתנים' groupType='variables'/>
    <ActionsGroup title='פונקציות' groupType='functions'/>
  </div>;
};

export default LeftSidebar;
