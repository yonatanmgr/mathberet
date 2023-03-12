import React from 'react';
import Shortcut from '@components/common/Shortcut';
import './Page.scss';

const PagePlaceholder = () => {
  return (
    <div className='page-placeholder'>
      <div className='placeholder-text'>
        כדי להתחיל, <br />
        לחצו על כפתור המחברות שבצד ימין <Shortcut shortcut={["Ctrl", "o"]}/> ובחרו קובץ!
      </div>
    </div>
  );
};

export default PagePlaceholder;
