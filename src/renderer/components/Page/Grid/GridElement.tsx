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
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode[];
  onMouseDown?: (e: React.MouseEvent) => {};
  onMouseUp?: (e: React.MouseEvent) => {};
  onTouchEnd?: (e: React.TouchEvent) => {};
}

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

const GridElement = React.forwardRef(({blockElement, key, onRemoveItem, style, className, onMouseDown, onMouseUp, onTouchEnd, children}: GridElementProps, ref) => {
  const ReactElement = 
  <div className={["block", className].join(" ")} ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onTouchEnd={onTouchEnd} style={{ ...style }} key={key}>
    <div className='block-handle'><i className='fi fi-rr-menu-dots-vertical' /></div>
    <div className='block-content'>
      {Switcher(blockElement.type)}
      <button name={blockElement.i} className='block-remove-button' onClick={onRemoveItem}><i className='fi fi-rr-x' /></button>
    </div>
    {children}
  </div>;

  return ReactElement;
})

GridElement.displayName = "GridElement"

export default GridElement;
