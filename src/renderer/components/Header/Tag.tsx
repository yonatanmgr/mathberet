import React from 'react';

type TagProps = { text: string; color: string };
const Tag = ({ text, color }: TagProps) => {
  return (
    <div className='tag-pill' style={{ backgroundColor: `hsl(${color}, var(--tag-saturation), var(--tag-lightness))`}}>
      <span className='tag-action' onClick={()=>console.log("Remove tag:", text)}></span>
      <div className='tag-content'>{text}</div>      
    </div>
  );
};

export default Tag;
