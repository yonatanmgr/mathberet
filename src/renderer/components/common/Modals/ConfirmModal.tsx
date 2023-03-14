import React from 'react';
import ReactDom from 'react-dom';
import './ConfirmModal.scss';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <span className='modal-text'>{text}</span>
        <div className='actions-container'>
          <button onClick={onConfirm} className='danger-button'>
            {t("OK")}
          </button>
          <button onClick={onCancel}>{t("Cancel")}</button>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
