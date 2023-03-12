import React from 'react';
import './Notification.scss';

type NotificationProps = {
  scene: string;
};

export const Notification = ({ scene }: NotificationProps) => {
  let content = '';

  switch (scene) {
    case '':
      content = '';
      break;
    case 'save':
      content = 'הקובץ נשמר!';
      break;
    case 'firstSelect':
      content = 'יש לבחור קובץ כדי לשמור!';
      break;
    case 'error':
      content = 'הייתה תקלה בשמירת הקובץ!';
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