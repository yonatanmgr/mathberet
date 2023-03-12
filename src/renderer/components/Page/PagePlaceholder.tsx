import React from 'react';
import Shortcut from '@components/common/Shortcut';
import './Page.scss';

const PagePlaceholder = () => {
  return (
    <div className='page-placeholder'>
      <div className='placeholder-text'>
        כדי להתחיל, <br />
        לחצו על כפתור המחברות בצד ימין{' '}
        <kbd className='kbc-button'>
          <i className='fi fi-rr-notebook'></i>
        </kbd>{' '}
        (או <Shortcut shortcut={['Ctrl', 'o']} />) ובחרו/צרו קובץ!
      </div>
    </div>
  );
};

export default PagePlaceholder;
