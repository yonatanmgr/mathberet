import React, { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';
import './ErrorModal.scss';

interface ErrorModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export default function ErrorModal({
  open,
  onClose,
  children,
}: ErrorModalProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        {children}
        <div className='actions-container'>
          <button onClick={onClose} className='danger-button'>
            אישור
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
