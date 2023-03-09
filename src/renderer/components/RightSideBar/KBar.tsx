import React from 'react';
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarResults,
  KBarSearch,
  useMatches
} from 'kbar';

import { setColor, setTheme } from '@components/Application';

function KBar() {
  function RenderResults() {
    const { results } = useMatches();
  
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div>{item}</div>
          ) : (
            <div style={{
              direction: 'rtl',
              padding: "14px 10px",
              borderRadius: "8px",
              fontSize: 16,
              userSelect: "none",
              background: active ? "hsla(var(--theme-hue), 50%, 50%, 0.1)" : "transparent"
              }}>
              {item.name}
            </div>
          )
        }
      />
    );
  }
  

  const actions = [
    {
      id: "preferences",
      name: "העדפות משתמש"
    },
    {
      id: "theme",
      name: "ערכת נושא",
      parent: "preferences"
    },
    {
      id: "color",
      name: "צבע נושא",
      parent: "preferences"
    },
    {
      id: "blue",
      name: "כחול",
      perform: () => { setColor('blue', 210) },
      parent: 'color'
    },
    {
      id: "pink",
      name: "ורוד",
      perform: () => { setColor('pink', 300) },
      parent: 'color'
    },
    {
      id: "yellow",
      name: "צהוב",
      perform: () => { setColor('yellow', 35) },
      parent: 'color'
    },
    {
      id: "purple",
      name: "סגול",
      perform: () => { setColor('purple', 250) },
      parent: 'color'
    },
    {
      id: "red",
      name: "אדום",
      perform: () => { setColor('red', 0) },
      parent: 'color'
    },
    {
      id: "green",
      name: "ירוק",
      perform: () => { setColor('green', 140) },
      parent: 'color'
    },
    {
      id: "light",
      name: "מצב אור",
      perform: () => { setTheme(0) },
      parent: 'theme'
    },
    {
      id: "dark",
      name: "מצב חושך",
      perform: () => { setTheme(1) },
      parent: 'theme'
    },
  ]

  const searchStyle = {
    padding: "12px 16px",
    fontSize: "16px",
    width: "100%",
    fontFamily: 'Rubik',
    direction: 'rtl' as const,
    boxSizing: "border-box" as React.CSSProperties["boxSizing"],
    outline: "none",
    border: "none",
    background: "transparent",
    color: "var(--titlebar-color)",
  };
  
  const animatorStyle = {
    maxWidth: "600px",
    width: "100%",
    padding: "10px 8px",
    outline: "1px solid var(--page-border)",
    backdropFilter: "blur(5px)",
    background: "var(--kbar-bg)",
    color: "var(--titlebar-color)",
    borderRadius: "12px",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, .25)",
    overflow: "hidden",
  };
  

  return (
    <KBarProvider actions={actions} options={{ toggleShortcut: "$mod+Shift+p"}}>
      <KBarPortal> 
        <KBarPositioner> 
          <KBarAnimator style={animatorStyle}>
            <KBarSearch style={searchStyle} defaultPlaceholder='הקלידו פקודה או חפשו...' />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
}

export default KBar