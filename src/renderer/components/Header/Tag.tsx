import React from 'react';

type TagProps = { text: string; color: string };
const Tag = ({ text, color }: TagProps) => {
  return (
    <div className='tag-pill' style={{ backgroundColor: `hsl(${color}, var(--tag-saturation), var(--tag-lightness))`}}>
      <span className='hashtag'># </span>
      <span className='tag-text'>{text}</span>
    </div>
  );
};

export default Tag;
