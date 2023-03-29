import React from 'react';
import './CommandBar.scss';

import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarResults,
  KBarSearch,
  useMatches,
  useRegisterActions,
} from 'kbar';

import { useTranslation } from 'react-i18next';
import { useGeneralContext } from '@components/GeneralContext';

export function CommandBar() {
  const { t } = useTranslation();

  const { actions } = useGeneralContext();

  function RenderResults() {
    // updating the actions using `useRegisterActions` *before*
    // getting the results from `useMatches` so the results
    // are always up to date. the actions are also up to date
    // cause they are now stateful

    useRegisterActions(actions);
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === 'string' ? (
            <div>{item}</div>
          ) : (
            <div className={`command-bar-result${active ? ' active' : ''}`}>
              {item.name}
            </div>
          )
        }
      />
    );
  }

  const animatorStyle = {
    maxWidth: '600px',
    width: '100%',
    zIndex: '10000',
    padding: '10px 8px',
    outline: '1px solid var(--page-border)',
    backdropFilter: 'blur(7px)',
    background: 'var(--command-bar-bg)',
    color: 'hsla(var(--app-text-color), 1)',
    borderRadius: '12px',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, .25)',
    overflow: 'hidden',
  };

  return (
    <KBarPortal>
      <KBarPositioner style={{ width: 'unset' }}>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch
            className='command-bar-search'
            defaultPlaceholder={t('Prompt')}
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
