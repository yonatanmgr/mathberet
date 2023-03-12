import { useGeneralContext } from '@components/GeneralContext';
import React from 'react';

export type TagProps = {
  text: string;
  color: string;
};

export const Tag = ({ text, color }: TagProps) => {
  const { setCurrentFileTags, currentFileTags } = useGeneralContext();

  const handleRemoveTag = () => {
    setCurrentFileTags(currentFileTags.filter((tag: string) => tag != text));

    //TODO: figure out how to check if tag is not in all of the files
    
    // localStorage.setItem(
    //   'all-tags',
    //   JSON.stringify(
    //     JSON.parse(localStorage.getItem('all-tags')).filter(
    //       (tag: TagProps) => tag.text != text,
    //     ),
    //   ),
    // );
  };

  return (
    <div
      className='tag-pill'
      style={{
        backgroundColor: `hsl(${color}, var(--tag-saturation), var(--tag-lightness))`,
      }}
    >
      <span className='tag-action' onClick={handleRemoveTag}></span>
      <div className='tag-content'>{text}</div>
    </div>
  );
};
