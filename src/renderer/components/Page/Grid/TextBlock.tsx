import React from 'react';

type Props = {
  children?: string | JSX.Element;
};

const TextBlockContent = ({ children }: Props) => {
  return (
    <div className='block-content-edit' contentEditable>
      {children}
    </div>
  );
};

export default TextBlockContent;
