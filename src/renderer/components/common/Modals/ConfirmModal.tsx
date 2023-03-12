import React from 'react';
import ReactDom from 'react-dom';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  text: string;
}

export default function ConfirmModal({
  open,
  onConfirm,
  onCancel,
  text
}: ConfirmModalProps) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        {text}
        <div className='actions-container'>
          <button onClick={onConfirm} className='danger-button'>
            כן
          </button>
          <button onClick={onCancel}>לא</button>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
