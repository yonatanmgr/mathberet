import { ValueProps, canvasProps } from '@renderer/common/types';
import { Tldraw, TldrawApp } from '@tldraw/tldraw';
import React, { useEffect, useState } from 'react';

function DrawBlockContent({ content, blockStateFunction }: ValueProps) {
  const [canvasState, setCanvasState] = useState({ shapes: [] });

  useEffect(() => {
    blockStateFunction(canvasState);
  }, [canvasState]);

  return (
    <div className='draw-applet'>
      <Tldraw
        autofocus={true}
        showMenu={false}
        showMultiplayerMenu={false}
        showPages={false}
        showStyles={false}
        showZoom={false}
        onMount={(app: TldrawApp) => {
          // app.setSetting('showGrid', true);
          app.insertContent(content ? (content as canvasProps) : { shapes: [] });
          app.zoomToContent();
        }}
        onPersist={(app: TldrawApp) => setCanvasState(app.getContent())}
      />
    </div>
  );
}

export default DrawBlockContent;
