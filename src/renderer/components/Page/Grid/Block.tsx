import React from 'react';
import TextBlockContent from './TextBlock';

type Props = {
  children?: string | JSX.Element;
};

const GridBlock = ({ children }: Props) => {
  return (
    <div className='block'>
      <div className='block-handle'>
        <i className='fi fi-rr-menu-dots-vertical' />
      </div>
      <div className='block-content'>
        <TextBlockContent>{children}</TextBlockContent>
      </div>
    </div>
  );
};

export default GridBlock;
