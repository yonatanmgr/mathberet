import React, { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';
import './Modal.scss';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  open,
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        {children}
        <div className='actions-container'>
          <button onClick={onConfirm} className='danger-button'>כן</button>
          <button onClick={onCancel}>לא</button>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
