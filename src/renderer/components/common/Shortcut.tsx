import React from 'react';

type ShortcutProps = {
  shortcut: string[];
};

const Shortcut = ({ shortcut }: ShortcutProps) => {
  const keys = shortcut.map((k: string) => (
    <>
      <>{k == shortcut[0] ? '' : '+'}</>
      <kbd className='kbc-button'>{k}</kbd>
    </>
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
      {keys ? keys : null}
    </span>
  );
};

export default Shortcut;
