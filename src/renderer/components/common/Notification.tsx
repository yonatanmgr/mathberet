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

    // NOT IMPLEMENTED YET
    case 'cantCreate':
      content = 'לא ניתן ליצור קובץ חדש, קיים קובץ בעל שם זהה!';
      break;
    case 'cantMove':
      content = 'לא ניתן להזיז את הקובץ למיקום זה!';
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