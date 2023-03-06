import { Tldraw } from "@tldraw/tldraw";
import React from "react";

function DrawBlockContent() {
    return <div className="draw-applet"><Tldraw
        autofocus={true}
        showMenu={false}
        showMultiplayerMenu={false}
        showPages={false}
        showStyles={false}
        showZoom={false}
    /></div>
  }

export default DrawBlockContent