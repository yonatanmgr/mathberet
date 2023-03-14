import React, { useEffect, useState } from 'react';
import ActionsGroup from './ActionsGroup';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';

const LeftSidebar = () => {
  const { t, i18n } = useTranslation();
  const { isLeftSidebarOpen } = useGeneralContext()
  const [showClass, setShowClass] = useState('');

  useEffect(() => {
    setShowClass(isLeftSidebarOpen);
  }, [isLeftSidebarOpen])

  return <div className={`left-sidebar${showClass ? ' open' : ''}`}>
    <ActionsGroup title={t("Variables")} groupType='variables'/>
    <ActionsGroup title={t("Functions")} groupType='functions'/>
  </div>;
};

export default LeftSidebar;
