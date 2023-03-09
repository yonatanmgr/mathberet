import React, { useEffect, useState } from 'react';
import { Tag } from './Header';

const AddTag = () => {
  const [clickState, setClickState] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [savedValue, setSavedValue] = useState('');

  const addTagStyle = {
    backgroundColor: 'unset',
    height: '14px',
    border: 'none',
    color: 'unset',
    fontFamily: 'unset',
    fontSize: 'unset',
    minWidth: `79px`,
    width: `${currentValue.length * 9 + 10}px`,
    outline: 'none',
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSavedValue(currentValue);
      setClickState(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('all-tags'))
      localStorage.setItem('all-tags', JSON.stringify([]));
    else {
      const allTags: Tag[] = JSON.parse(localStorage.getItem('all-tags'));

      const createdTag: Tag = {
        id: crypto.randomUUID(),
        text: savedValue,
        color: Math.floor(Math.random() * 359).toString(),
      };
      
      if (!allTags.find((tag: Tag) => tag.text == createdTag.text) && createdTag.text != '') {
        allTags.push(createdTag) 
      }

      localStorage.setItem('all-tags', JSON.stringify(allTags));
      
      window.dispatchEvent(new Event("setTags"));
    }
  }, [savedValue]);

  useEffect(() => {
    setCurrentValue('');
  }, [clickState]);

  const content = clickState ? (
    <input
      autoFocus={true}
      type='text'
      title=''
      placeholder='הוספת תגית'
      className='tag-text-adding'
      onChange={(e) => setCurrentValue(e.target.value)}
      onKeyDown={handleKeyDown}
      style={addTagStyle}
    />
  ) : (
    <>
      <span className='tag-text'>הוספת תגית</span>
    </>
  );

  return (
    <div className='tag-pill new' onClick={() => setClickState(true)}>
      {content}
    </div>
  );
};

export default AddTag;
