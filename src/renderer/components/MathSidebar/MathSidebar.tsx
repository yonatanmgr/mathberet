import React, { useEffect, useState } from 'react';
import ActionsGroup from './ActionsGroup';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';
import { VariableProps } from '@renderer/common/types';
import Variable from './Variable';

const MathSidebar = () => {
  const { t, i18n } = useTranslation();
  const { isMathSidebarOpen, currentVariables, } = useGeneralContext()
  const [showClass, setShowClass] = useState('');

  useEffect(() => {
    setShowClass(isMathSidebarOpen);
  }, [isMathSidebarOpen])

  return <div className={`math-sidebar${showClass ? ' open' : ''}`}>
    <ActionsGroup title={t("Variables")} groupType='variables'>
      {currentVariables.map((variable: VariableProps) => {
        return <Variable key={variable.blockId} definition={variable.definition} blockId={variable.blockId} />
      })}
    </ActionsGroup>
    <ActionsGroup title={t("Functions")} groupType='functions'></ActionsGroup>
  </div>;
};

export default MathSidebar;
