import React, { useState } from 'react';
import { MathfieldComponent } from "react-mathlive";


export function MathBlockContent() {
    const [latex, setLatex] = useState("f(x)=\\log _10 x");
    return <MathfieldComponent
      latex={latex}
      onChange={setLatex}
    />;
  }

export default MathBlockContent