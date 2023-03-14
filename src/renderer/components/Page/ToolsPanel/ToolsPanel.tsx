import React from 'react';
import '../Page.scss';
import Tool from './Tool';
import { useGeneralContext } from '@components/GeneralContext';
import { WidgetType } from '@renderer/common/types';
import { useTranslation } from 'react-i18next';

const ToolsPanel = () => {
  const { t, i18n } = useTranslation();
  const { setNewWidgetRequest, setClearPageRequest, setSaveRequest } = useGeneralContext();

  const handleOnClickTool = (widgetType: WidgetType) => {
    setNewWidgetRequest({ widgetType });
  };

  const clearPage = () => {
    setClearPageRequest({ cmd: 'clear' });
  };

  const savePage = () => {
    setSaveRequest({ cmd: 'save' });
  };

  return (
    <div className='tools-panel-container'>
      <div className='tools-panel'>
        <Tool
          title={t("Text Block")}
          buttonType='addTextBlock'
          icon='letter-case'
          onClick={() => handleOnClickTool(WidgetType.Text)}
        />
        <Tool
          title={t("Math Block")}
          buttonType='addMathBlock'
          icon='square-root'
          onClick={() => handleOnClickTool(WidgetType.Math)}
        />
        <Tool
          title={t("Graph Block")}
          buttonType='addGraphBlock'
          icon='chat-arrow-grow'
          onClick={() => handleOnClickTool(WidgetType.Graph)}
        />
        {/* <Tool
          title={t("Picture Block")}
          buttonType='addPictureBlock'
          icon='picture'
          onClick={() => handleOnClickTool(WidgetType.Picture)}
        /> */}
        <Tool
          title={t("Draw Block")}
          buttonType='addDrawBlock'
          icon='pencil'
          onClick={() => handleOnClickTool(WidgetType.Draw)}
        />
        {/* <Tool title='הוספת קבוצה' buttonType='addGroupBlock' icon='apps-add' /> */}
        <Tool
          title={t("Divider")}
          buttonType='addDividerBlock'
          icon='minus'
          onClick={() => handleOnClickTool(WidgetType.Divider)}
        />
        <svg viewBox="0 0 24 24" className='tool-divider'><path d="M11,3 L11,21 C11,21.5522847 11.4477153,22 12,22 C12.5522847,22 13,21.5522847 13,21 L13,3 C13,2.44771525 12.5522847,2 12,2 C11.4477153,2 11,2.44771525 11,3 Z"></path></svg>
        <Tool
          title={t("Save")}
          buttonType='savePage'
          icon={'disk'}
          onClick={() => savePage()}
        />
        <Tool
          title={t("Clear")}
          buttonType='clearPage'
          icon={'trash'}
          onClick={() => clearPage()}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
