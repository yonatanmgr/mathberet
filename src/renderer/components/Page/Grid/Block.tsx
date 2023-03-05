import React, { PropsWithChildren } from 'react';
import TextBlockContent from './TextBlock';

const GridBlock = ({ children }: PropsWithChildren, key: number) => {
  return (
    <div className='block' data-grid={{ x: 1, y: 0, w: 4, h: 1, minW: 2, maxW: 8 }} key={key}>
      <div className='block-handle'>
        <i className='fi fi-rr-menu-dots-vertical' />
      </div>
      <div className='block-content'>
        {/* <TextBlockContent>{children}</TextBlockContent> */}
      </div>
    </div>
  );
};

export default GridBlock;
