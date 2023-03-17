import React, { useEffect, useState } from 'react';
import '../Application.scss';
import { icons } from '../Icons';
import FilePath from './FilePath';
import { Tag, TagProps } from './Tag';
import AddTag from './AddTag';
import WindowControls from '@misc/window/components/WindowControls';
import { useGeneralContext } from '@components/GeneralContext';

const Header = () => {
  const allTags = JSON.parse(localStorage.getItem('all-tags'));
  const { selectedFile, currentFileTags, setCurrentFileTags, currentOS } = useGeneralContext();
  const [currentFilePath, setCurrentFilePath] = useState('');

  useEffect(() => {
    setCurrentFilePath(selectedFile);
    setCurrentFileTags([])
  }, [selectedFile]);

  return (
    <div className='header'>
      <div className='main-heading'>
        <section className='header-content'>
          <div className='logo'>
            <img src={icons.logo} id='logo' alt='מתברת' />
          </div>
          <FilePath filePath={currentFilePath} />
          <div className='tags'>
            {currentFileTags
              ? currentFileTags.map((tag: string) => {
                  const foundTag = allTags.find(
                    (searchTag: TagProps) => searchTag.text == tag,
                  );
                  return (
                    <Tag
                      key={`tag-${foundTag.text}`}
                      text={foundTag.text}
                      color={foundTag.color}
                    />
                  );
                })
              : null}
            {currentFilePath ? <AddTag /> : <></>}
          </div>
        </section>
        <section className='header-draggable'></section>
        <section className='header-controls'>
          <WindowControls platform={currentOS}></WindowControls>
        </section>
      </div>
    </div>
  );
};

export default Header;
