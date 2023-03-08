import { ValueProps } from '@renderer/common/types';
import { Tldraw, TldrawApp } from '@tldraw/tldraw';
import React, { useEffect, useState } from 'react';

function DrawBlockContent({ content, blockStateFunction }: ValueProps) {
  const [canvasState, setCanvasState] = useState<object>({ shapes: [] });

  useEffect(() => {
    blockStateFunction(canvasState);
  }, [canvasState]);

  return (
    <div className='draw-applet'>
      <Tldraw
        // document={content ? content.canvas : {}}
        autofocus={true}
        showMenu={false}
        showMultiplayerMenu={false}
        showPages={false}
        showStyles={false}
        showZoom={false}
        onMount={(app: TldrawApp) => {
          app.setSetting('showGrid', true);
          app.insertContent(content ? content.canvas : { shapes: [] });
          app.zoomToContent();
        }}
        onPersist={(app: TldrawApp) => setCanvasState(app.getContent())}
      />
    </div>
  );
}

export default DrawBlockContent;
