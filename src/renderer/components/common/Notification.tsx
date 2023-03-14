import React from 'react';
import './Notification.scss';
import { useTranslation } from 'react-i18next';

type NotificationProps = {
  scene: string;
};

export const Notification = ({ scene }: NotificationProps) => {
  const { t, i18n } = useTranslation();
  let content = '';

  switch (scene) {
    case '':
      content = '';
      break;
    case 'save':
      content = t("Saved");
      break;

    case 'error':
      content = t("Save Error");
      break;

    default:
      break;
  }

  return (
    <div id='notification' className={content == '' ? '' : 'show'}>
      {content}
    </div>
  );
};

export const triggerPopupAnimation = (type: string, setPopupType: (args: string) => unknown) => {
  setTimeout(() => {
    setPopupType(type);
    setTimeout(() => {
      setPopupType('');
    }, 1200);
  }, 0);
};