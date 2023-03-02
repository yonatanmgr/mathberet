import React from 'react';
import { icons } from '../Icons';
import './Page.scss';

type ToolProps = { title: string; buttonType: string; icon?: string };
const Tool = ({ buttonType, title, icon }: ToolProps) => {
  const iconName = `fi fi-rr-${icon}`
  return (
    <button title={title} id={buttonType} className='tool'>
      {icon && <i className={iconName} />}
    </button>
  );
};

const ToolsPanel = () => {
  return (
    <div className='tools-panel'>
      <Tool
        title='הוספת בלוק טקסט'
        buttonType='addTextBlock'
        icon={'letter-case'}
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
  );
};

export default ToolsPanel;
