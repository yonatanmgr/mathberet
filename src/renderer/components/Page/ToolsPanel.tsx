import React from 'react';
import './Page.scss';
import PageGrid from './Grid/Grid';

type ToolProps = { title: string; buttonType: string; icon?: string; onClick?: React.MouseEventHandler<HTMLButtonElement>; };
const Tool = ({ buttonType, title, icon, onClick }: ToolProps) => {
  const iconName = `fi fi-rr-${icon}`
  return (
    <button title={title} id={buttonType} className='tool' onClick={onClick}>
      {icon && <i className={iconName} />}
    </button>
  );
};

const ToolsPanel = () => {
  const handleOnClickTool = (toolName:string) => {
    switch (toolName) {
      case 'text':
        PageGrid.call('handleAddWidget')
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
          onClick={()=>handleOnClickTool('text')}
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
