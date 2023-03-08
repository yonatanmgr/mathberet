import React from 'react';
import ActionsGroup from './ActionsGroup';

const LeftSidebar = () => {
  return <div className='left-sidebar'>
    <ActionsGroup title='משתנים' groupType='variables'/>
    <ActionsGroup title='פונקציות' groupType='functions'/>
  </div>;
};

export default LeftSidebar;
