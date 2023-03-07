import React from 'react';
import TextBlockContent from './Blocks/TextBlock';
import MathBlockContent from './Blocks/MathBlock';
import GraphBlockContent from './Blocks/GraphBlock';
import { WidgetType } from '@renderer/common/types';
import DrawBlockContent from './Blocks/DrawBlock';
import './Grid.scss'

interface GridElementProps {
  el: any;
  widgetType: WidgetType;
  onRemoveItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const GridElement = ({ el, widgetType, onRemoveItem }: GridElementProps) => {

  console.log(1)

  function Switcher(widgetType: WidgetType) {
    switch (widgetType) {
      case WidgetType.Text:
        return <TextBlockContent />;
      case WidgetType.Math:
        return <MathBlockContent />;
      case WidgetType.Graph:
        return <GraphBlockContent />;
      case WidgetType.Divider:
        return <hr className='pageDivider'></hr>;
      case WidgetType.Draw:
        return <DrawBlockContent />;
      default:
        return null;
    }
  }

  return (
    <div className='block' data-grid={el} key={el.i}>
      <div className='block-handle'>
        <i className='fi fi-rr-menu-dots-vertical' />
      </div>
      <div className='block-content'>
        {Switcher(widgetType)}
        <button
          title='x'
          name={el.i}
          className='block-remove-button'
          onClick={onRemoveItem}
        >
          <i className='fi fi-rr-x'></i>
        </button>
      </div>
    </div>
  );
};

export default GridElement;
