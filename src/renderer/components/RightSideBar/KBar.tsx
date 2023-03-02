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
              background: active ? "var(--pill-bgcolor)" : "transparent"
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
      id: "theme",
      name: "ערכת נושא",
    },
    {
      id: "light",
      name: "מצב אור",
      perform: () => {
        localStorage.setItem('dark-mode', '0');
        document.body.classList.remove('dark-mode');    
      },
      parent: 'theme'
    },
    {
      id: "dark",
      name: "מצב חושך",
      perform: () => {
        localStorage.setItem('dark-mode', '1');
        document.body.classList.add('dark-mode');    
      },
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
    background: "var(--app-bgcolor)",
    color: "var(--titlebar-color)",
  };
  
  const animatorStyle = {
    maxWidth: "600px",
    width: "100%",
    padding: "10px 8px",
    outline: "1px solid var(--page-border)",
    background: "var(--app-bgcolor)",
    color: "var(--titlebar-color)",
    borderRadius: "12px",
    overflow: "hidden",
  };
  

  return (
    <KBarProvider actions={actions}>
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