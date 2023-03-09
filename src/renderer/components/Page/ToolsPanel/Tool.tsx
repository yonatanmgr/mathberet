import React from 'react';

type ToolProps = {
  title: string;
  buttonType: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Tool = ({ buttonType, title, icon, onClick }: ToolProps) => {
  const iconName = `fi fi-rr-${icon}`;
  return (
    <button data-tooltip={title} id={buttonType} className='tool' onClick={onClick}>
      {icon && <i className={iconName} />}
    </button>
  );
};

export default Tool;
