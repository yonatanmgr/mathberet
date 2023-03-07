import React from 'react';
import TextBlockContent from './Blocks/TextBlock';
import MathBlockContent from './Blocks/MathBlock';
import GraphBlockContent from './Blocks/GraphBlock';
import { BlockElement, WidgetType } from '@renderer/common/types';
import DrawBlockContent from './Blocks/DrawBlock';
import './Grid.scss'

type GridElementProps = {
  blockElement: BlockElement;
  onRemoveItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const GridElement = ({ blockElement, onRemoveItem }: GridElementProps) => {

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
    <div className='block' data-grid={blockElement} key={blockElement.i}>
      <div className='block-handle'>
        <i className='fi fi-rr-menu-dots-vertical' />
      </div>
      <div className='block-content'>
        {Switcher(blockElement.type)}
        <button
          title='x'
          name={blockElement.i}
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
