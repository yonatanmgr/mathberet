import React, { useEffect, useState } from 'react';
import { TagProps } from './Tag';
import { useGeneralContext } from '@components/GeneralContext';
import { useTranslation } from 'react-i18next';

const AddTag = () => {
  const { t, i18n } = useTranslation();

  const [clickState, setClickState] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [savedValue, setSavedValue] = useState('');
  const { setCurrentFileTags, currentFileTags } = useGeneralContext();

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSavedValue(currentValue);
      setClickState(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('all-tags'))
      localStorage.setItem('all-tags', JSON.stringify([]));
    else {
      const allTags: TagProps[] = JSON.parse(localStorage.getItem('all-tags'));

      const createdTag: TagProps = {
        text: savedValue,
        color: Math.floor(Math.random() * 359).toString(),
      };

      if (
        !allTags.find((tag: TagProps) => tag.text == createdTag.text) &&
        createdTag.text != ''
      ) {
        allTags.push(createdTag);
      }

      if (
        !currentFileTags.find((tag: TagProps) => tag.text == createdTag.text) &&
        createdTag.text != ''
      ) {
        setCurrentFileTags([...currentFileTags, createdTag.text].flat())
      }

      localStorage.setItem('all-tags', JSON.stringify(allTags));
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
      placeholder={t("Add Tag")}
      className='tag-text-adding'
      onChange={(e) => setCurrentValue(e.target.value)}
      onKeyDown={handleKeyDown}
      style={addTagStyle}
    />
  ) : (
    <>
      <span className='tag-text'>{t("Add Tag")}</span>
    </>
  );

  return (
    <div className='tag-pill new' onClick={() => setClickState(true)}>
      {content}
    </div>
  );
};

export default AddTag;
