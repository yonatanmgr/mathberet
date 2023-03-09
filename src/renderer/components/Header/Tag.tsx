import React from 'react';

export type Tag = {
  text: string;
  color: string;
};

const Tag = ({ text, color }: Tag) => {

  const handleRemoveTag = () => {
    localStorage.setItem('all-tags', JSON.stringify(
      JSON.parse(localStorage.getItem('all-tags')).filter(
        (tag: Tag) => tag.text != text
      )
    ))
    window.dispatchEvent(new Event("setTags"));
  }

  return (
    <div className='tag-pill' style={{ backgroundColor: `hsl(${color}, var(--tag-saturation), var(--tag-lightness))`}}>
      <span className='tag-action' onClick={handleRemoveTag}></span>
      <div className='tag-content'>{text}</div>      
    </div>
  );
};

export default Tag;
