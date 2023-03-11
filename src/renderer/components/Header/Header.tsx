import React, { useEffect, useState } from 'react';
import '../Application.scss';
import { icons } from '../Icons';
import FilePath from './FilePath';
import Tag from './Tag';
import AddTag from './AddTag';
import WindowControls from '@misc/window/components/WindowControls';
import { useGeneralContext } from '@components/GeneralContext';


const Header = () => {
  const [tags, setTags] = useState<Tag[]>(
    JSON.parse(localStorage.getItem('all-tags')),
  );

  window.addEventListener('setTags', () => {
    setTags(JSON.parse(localStorage.getItem('all-tags')));
  });

  const { selectedFile } = useGeneralContext();
  const [currentFilePath, setCurrentFilePath] = useState("")

  useEffect(() => {
    setCurrentFilePath(selectedFile)
  }, [selectedFile])
  
  return (
    <div className='header'>
      <div className='main-heading'>
        <section className='header-content'>
          <div className='logo'>
            <img src={icons.logo} id='logo' alt='מתברת' />
          </div>
          <FilePath filePath={currentFilePath} />
          <div className='tags'>
            {tags
              ? tags.map((tag) => (
                  <Tag
                    key={`tag-${tag.text}`}
                    text={tag.text}
                    color={tag.color}
                  />
                ))
              : null}
            {currentFilePath ? <AddTag /> : <></> }
          </div>
        </section>
        <section className='header-draggable'></section>
        <section className='header-controls'>
          <WindowControls platform='windows'></WindowControls>
        </section>
      </div>
    </div>
  );
};

export default Header;
