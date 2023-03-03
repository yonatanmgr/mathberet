import React, { PropsWithChildren } from 'react';
import TextBlockContent from './TextBlock';

const GridBlock = ({ children }: PropsWithChildren) => {
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
