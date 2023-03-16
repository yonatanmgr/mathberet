import React from 'react';

import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarResults,
  KBarSearch,
  useMatches,
  Action,
} from 'kbar';

import {
  setColor,
  setLang,
  setTheme,
} from '@components/Application';


import i18n from '@common/i18n';
import { useTranslation } from 'react-i18next';

export const actions: Action[] = [
  {
    id: 'preferences',
    name: i18n.t('Preferences'),
  },
  {
    id: 'language',
    name: i18n.t('Language'),
    parent: 'preferences',
  },
  {
    id: 'theme',
    name: i18n.t('Theme'),
    parent: 'preferences',
  },
  {
    id: 'color',
    name: i18n.t('Color'),
    parent: 'preferences',
  },
  {
    id: 'hebrew',
    name: i18n.t('Hebrew'),
    perform: () => {
      setLang('he');
    },
    parent: 'language',
  },
  {
    id: 'english',
    name: i18n.t('English'),
    perform: () => {
      setLang('en');
    },
    parent: 'language',
  },
  {
    id: 'russian',
    name: i18n.t('Russian'),
    perform: () => {
      setLang('ru');
    },
    parent: 'language',
  },
  {
    id: 'arabic',
    name: i18n.t('Arabic'),
    perform: () => {
      setLang('ar');
    },
    parent: 'language',
  },
  {
    id: 'blue',
    name: i18n.t('Blue'),
    perform: () => {
      setColor('blue', 210);
    },
    parent: 'color',
  },
  {
    id: 'pink',
    name: i18n.t('Pink'),
    perform: () => {
      setColor('pink', 300);
    },
    parent: 'color',
  },
  {
    id: 'yellow',
    name: i18n.t('Yellow'),
    perform: () => {
      setColor('yellow', 35);
    },
    parent: 'color',
  },
  {
    id: 'purple',
    name: i18n.t('Purple'),
    perform: () => {
      setColor('purple', 250);
    },
    parent: 'color',
  },
  {
    id: 'red',
    name: i18n.t('Red'),
    perform: () => {
      setColor('red', 0);
    },
    parent: 'color',
  },
  {
    id: 'green',
    name: i18n.t('Green'),
    perform: () => {
      setColor('green', 140);
    },
    parent: 'color',
  },
  {
    id: 'light',
    name: i18n.t('Light'),
    perform: () => {
      setTheme(0);
    },
    parent: 'theme',
  },
  {
    id: 'dark',
    name: i18n.t('Dark'),
    perform: () => {
      setTheme(1);
    },
    parent: 'theme',
  },
];

export function KBar() {
  const { t, i18n } = useTranslation();
  
  function RenderResults() {
    const { results } = useMatches();

    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === 'string' ? (
            <div>{item}</div>
          ) : (
            <div className={`kbar-result${active ? ' active' : ''}`}>
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
    background: 'var(--kbar-bg)',
    color: 'hsla(var(--app-text-color), 1)',
    borderRadius: '12px',
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, .25)',
    overflow: 'hidden',
  };

  return (
    <KBarPortal>
      <KBarPositioner style={{width: 'unset'}}>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch
            className='kbar-search'
            defaultPlaceholder={t('Prompt')}
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
