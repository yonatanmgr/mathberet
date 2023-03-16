import React from 'react';
import '../Application.scss';
import './FilesSidebar.scss';

type SidebarButtonProps = {
  title: string;
  state?: boolean;
  buttonType: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const SidebarButton = ({
  buttonType,
  state,
  title,
  icon,
  onClick,
}: SidebarButtonProps) => {
  const iconName = `fi fi-rr-${icon}`
  return (
    <div>
      <button
        data-tooltip={title}
        className={'sidebar-button' + (state ? ' open' : '')}
        id={buttonType}
        onClick={onClick}
      >
        <i className={iconName}></i>
      </button>
    </div>
  );
};

export default SidebarButton;
