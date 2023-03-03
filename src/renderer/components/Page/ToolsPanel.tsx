import React, { useContext } from 'react';
import './Page.scss';
import Tool from './Tool';
import { MyContext } from '@components/ContextApi';

const ToolsPanel = () => {
  const { setNewWidget } = useContext(MyContext);

  const handleOnClickTool = (toolName: string) => {
    switch (toolName) {
      case 'text':
        setNewWidget({ type: 'text' });
        break;
    }
  };

  return (
    <div className='tools-panel-container'>
      <div className='tools-panel'>
        <Tool
          title='הוספת בלוק טקסט'
          buttonType='addTextBlock'
          icon={'letter-case'}
          onClick={() => handleOnClickTool('text')}
        />
        <Tool
          title='הוספת בלוק מתמטי'
          buttonType='addMathBlock'
          icon={'square-root'}
        />
        <Tool
          title='הוספת בלוק גרפי'
          buttonType='addGraphBlock'
          icon={'chat-arrow-grow'}
        />
        <Tool
          title='הוספת בלוק תמונה'
          buttonType='addPictureBlock'
          icon={'picture'}
        />
        <Tool
          title='הוספת קבוצה'
          buttonType='addGroupBlock'
          icon={'apps-add'}
        />
        <Tool
          title='הוספת קו מפריד'
          buttonType='addDividerBlock'
          icon={'minus'}
        />
        <Tool title='ניקוי הדף' buttonType='clearPage' icon={'trash'} />
      </div>
    </div>
  );
};

export default ToolsPanel;
