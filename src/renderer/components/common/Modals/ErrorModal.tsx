import React, { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';
import './ErrorModal.scss';
import { useTranslation } from 'react-i18next';

interface ErrorModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export default function ErrorModal({
  open,
  onClose,
  children,
}: ErrorModalProps) {
  const { t, i18n } = useTranslation();

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        {children}
        <div className='actions-container'>
          <button onClick={onClose} className='danger-button'>
            {t("OK")}
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
