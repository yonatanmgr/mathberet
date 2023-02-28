import React from 'react';
import { icons } from '../Icons';
import './Page.scss';

type ToolProps = { title: string; buttonType: string; icon?: string };
const Tool = ({ buttonType, title, icon }: ToolProps) => {
  return (
    <button title={title} id={buttonType} className='tool'>
      {icon && <img src={icon} alt={title} />}
    </button>
  );
};

const ToolsPanel = () => {
  return (
    <div className='tools-panel-container'>
      <div className='tools-panel'>
        <Tool
          title='הוספת בלוק טקסט'
          buttonType='addTextBlock'
          icon={icons.addQuill}
        />
        <Tool
          title='הוספת בלוק מתמטי'
          buttonType='addMathBlock'
          icon={icons.addMathBlock}
        />
        <Tool
          title='הוספת בלוק גרפי'
          buttonType='addGraphBlock'
          icon={icons.addGraphBlock}
        />
        <Tool
          title='הוספת בלוק תמונה'
          buttonType='addPictureBlock'
          icon={icons.addPicture}
        />
        <Tool
          title='הוספת קבוצה'
          buttonType='addGroupBlock'
          icon={icons.addGroup}
        />
        <Tool
          title='הוספת קו מפריד'
          buttonType='addDividerBlock'
          icon={icons.addDivider}
        />
        <Tool title='ניקוי הדף' buttonType='clearPage' icon={icons.trashCan} />
      </div>
    </div>

  );
};

export default ToolsPanel;
