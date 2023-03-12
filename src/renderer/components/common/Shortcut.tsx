import React from 'react';

type ShortcutProps = {
  shortcut: string[];
};

const Shortcut = ({ shortcut }: ShortcutProps) => {
  const keys = shortcut.map((k: string) => (
    <span key={Math.random()}>
      <>{k == shortcut[0] ? '' : '+'}</>
      <kbd className='kbc-button'>{k}</kbd>
    </span>
  ));

  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        direction: 'ltr',
      }}
      className='shortcut'
    >
      {keys ? keys : <></>}
    </span>
  );
};

export default Shortcut;
