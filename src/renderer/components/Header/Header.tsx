import React from 'react';
import '../Application.scss';
import { icons } from '../Icons';
import FilePath from './FilePath';
import Tag from './Tag';
import AddTag from './AddTag';
import WindowControls from '@misc/window/components/WindowControls';

type Tag = {
  id: string;
  text: string;
  color: string;
};

const tags: Tag[] = [
  { text: 'חדוא', id: crypto.randomUUID(), color: '0' },
  { text: 'עוד אחד', id: crypto.randomUUID(), color: '130' },
];

const Header = () => {
  return (
    <div className='header'>
      <div className='main-heading'>
        <section className='header-content'>
          <div className='logo'>
            <img src={icons.logo} id='logo' alt='מתברת' />
          </div>
          <FilePath fileName='בדיקה' folderName='תיקייה' />
          <div className='tags'>
            {tags.map((tag) => (
              <Tag key={tag.id} text={tag.text} color={tag.color} />
            ))}
            <AddTag />
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
