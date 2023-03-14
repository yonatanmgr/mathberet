import React from 'react';
import Shortcut from '@components/common/Shortcut';
import './Page.scss';
import { useTranslation } from 'react-i18next';

const PagePlaceholder = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className='page-placeholder'>
      <div className='placeholder-text'>
        {t("Placeholder 1")}, <br />
        {t("Placeholder 2")}{' '}
        <kbd className='kbc-button'>
          <i className='fi fi-rr-notebook'></i>
        </kbd>{' '}
        ({t("Placeholder Or")} <Shortcut shortcut={['Ctrl', 'o']} />) {t("Placeholder 3")}!
      </div>
    </div>
  );
};

export default PagePlaceholder;
