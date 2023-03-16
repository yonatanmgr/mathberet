import React, { useEffect, useState } from 'react';
import ActionsGroup from './ActionsGroup';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';

const MathSidebar = () => {
  const { t, i18n } = useTranslation();
  const { isMathSidebarOpen } = useGeneralContext()
  const [showClass, setShowClass] = useState('');

  useEffect(() => {
    setShowClass(isMathSidebarOpen);
  }, [isMathSidebarOpen])

  return <div className={`math-sidebar${showClass ? ' open' : ''}`}>
    <ActionsGroup title={t("Variables")} groupType='variables'/>
    <ActionsGroup title={t("Functions")} groupType='functions'/>
  </div>;
};

export default MathSidebar;
