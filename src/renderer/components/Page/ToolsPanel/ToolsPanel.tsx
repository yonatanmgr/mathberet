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
    setClearPageRequest({ cmd: 'clear' });
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
          onClick={() => handleOnClickTool(WidgetType.Graph)}
        />
        {/* <Tool
          title='הוספת בלוק תמונה'
          buttonType='addPictureBlock'
          icon='picture'
          onClick={() => handleOnClickTool(WidgetType.Picture)}
        /> */}
        <Tool
          title='הוספת בלוק ציור'
          buttonType='addDrawBlock'
          icon='pencil'
          onClick={() => handleOnClickTool(WidgetType.Draw)}
        />
        {/* <Tool title='הוספת קבוצה' buttonType='addGroupBlock' icon='apps-add' /> */}
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
        <svg viewBox="0 0 24 24" className='tool-divider'><path d="M11,3 L11,21 C11,21.5522847 11.4477153,22 12,22 C12.5522847,22 13,21.5522847 13,21 L13,3 C13,2.44771525 12.5522847,2 12,2 C11.4477153,2 11,2.44771525 11,3 Z"></path></svg>
        <Tool
          title='שמירה'
          buttonType='savePage'
          icon={'disk'}
          onClick={() => null}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
