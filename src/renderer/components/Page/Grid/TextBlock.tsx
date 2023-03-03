import React, { PropsWithChildren } from 'react';

const TextBlockContent = ({ children }: PropsWithChildren) => {
  return (
    <div className='block-content-edit' contentEditable>
      {children}
    </div>
  );
};

export default TextBlockContent;
