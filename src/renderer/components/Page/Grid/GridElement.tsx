import React, { LegacyRef, useEffect, useState } from 'react';
import TextBlockContent from './Blocks/TextBlock';
import MathBlockContent from './Blocks/MathBlock';
import GraphBlockContent from './Blocks/GraphBlock';
import { BlockElement, ValueProps, WidgetType } from '@renderer/common/types';
import DrawBlockContent from './Blocks/DrawBlock';
import './Grid.scss';

type GridElementProps = {
  allValues: any[];
  setValuesFunction: (...args: unknown[]) => unknown;
  blockElement: BlockElement;
  blockValue: ValueProps;
  onRemoveItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode[];
  onMouseDown?: (e: React.MouseEvent) => unknown;
  onMouseUp?: (e: React.MouseEvent) => unknown;
  onTouchEnd?: (e: React.TouchEvent) => unknown;
};

function Switcher(
  widgetType: WidgetType,
  blockValue: ValueProps,
  blockStateFunction: (...args: unknown[]) => unknown,
) {

  try {
    switch (widgetType) {
      case WidgetType.Text:
        return (
          <TextBlockContent
            content={blockValue.content}
            blockStateFunction={blockStateFunction}
          />
        );
      case WidgetType.Math:
        return (
          <MathBlockContent
            content={blockValue.content}
            blockStateFunction={blockStateFunction}
          />
        );
      case WidgetType.Graph:
        return (
          <GraphBlockContent
            content={blockValue.content}
            blockStateFunction={blockStateFunction}
          />
        );
      case WidgetType.Divider:
        return <hr className='pageDivider'></hr>;
      case WidgetType.Draw:
        return (
          <DrawBlockContent
            content={blockValue.content}
            blockStateFunction={blockStateFunction}
          />
        );
      default:
        return null;
    }
  } catch (error) {
    console.log(error);
  }
}

const GridElement = React.forwardRef(
  (
    {
      blockElement,
      setValuesFunction,
      allValues,
      blockValue,
      key,
      onRemoveItem,
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      children,
    }: GridElementProps,
    ref,
  ) => {
    const [blockState, setBlockState] = useState();

    useEffect(() => {
      const currentState = {
        id: blockElement.i,
        metaData: {content: blockState},
      };

      const newAllValues = allValues.map((state) =>
        state.id == currentState.id
          ? { ...state, metaData: currentState.metaData }
          : state,
      );

      if (!newAllValues.find((state) => state.id == currentState.id)) {
        newAllValues.push(currentState);
      }
      
      setValuesFunction(newAllValues);
    }, [blockState]);

    const ReactElement = (
      <div
        className={['block', className].join(' ')}
        ref={(ref as LegacyRef<HTMLDivElement>)}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        style={{ ...style }}
        key={key}
        id={blockElement.i}
      >
        <div className='block-handle'>
          <i className='fi fi-rr-menu-dots-vertical' />
        </div>
        <div className='block-content'>
          {Switcher(blockElement.type, blockValue, setBlockState)}
          <button
            name={blockElement.i}
            className='block-remove-button'
            onClick={onRemoveItem}
          >
            <i className='fi fi-rr-x' />
          </button>
        </div>
        {children}
      </div>
    );

    return ReactElement;
  },
);

GridElement.displayName = 'GridElement';

export default GridElement;
