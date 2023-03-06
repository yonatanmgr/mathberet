import React from 'react';
import '../Page.scss';
import Tool from './Tool';
import { useGeneralContext } from '@components/GeneralContext';
import { WidgetType } from '@renderer/common/types';

const ToolsPanel = () => {
  const { setNewWidgetRequest, setClearPageRequest } = useGeneralContext();

  const handleOnClickTool = (widgetType: WidgetType) => {
    setNewWidgetRequest({ widgetType });
  };

  const clearPage = () => {
    setClearPageRequest({});
  };

  return (
    <div className='tools-panel-container'>
      <div className='tools-panel'>
        <Tool
          title='הוספת בלוק טקסט'
          buttonType='addTextBlock'
          icon='letter-case'
          onClick={() => handleOnClickTool(WidgetType.Text)}
        />
        <Tool
          title='הוספת בלוק מתמטי'
          buttonType='addMathBlock'
          icon='square-root'
          onClick={() => handleOnClickTool(WidgetType.Math)}
        />
        <Tool
          title='הוספת בלוק גרפי'
          buttonType='addGraphBlock'
          icon='chat-arrow-grow'
          onClick={() => handleOnClickTool(WidgetType.Ggb)}
        />
        {/* <Tool
          title='הוספת בלוק תמונה'
          buttonType='addPictureBlock'
          icon='picture'
          onClick={() => handleOnClickTool(WidgetType.Picture)}
        />
        <Tool title='הוספת קבוצה' buttonType='addGroupBlock' icon='apps-add' /> */}
        <Tool
          title='הוספת קו מפריד'
          buttonType='addDividerBlock'
          icon='minus'
          onClick={() => handleOnClickTool(WidgetType.Divider)}
        />
        <Tool
          title='ניקוי הדף'
          buttonType='clearPage'
          icon={'trash'}
          onClick={() => clearPage()}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
