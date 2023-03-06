import React, { useRef } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';

function MathBlockContent() {
  const ref = useRef<MathViewRef>(null);
  return <MathView
    ref={ref}
    className='math-field-element'
    inlineShortcuts={ML_SHORTCUTS}
    onExport={(ref, latex) => latex}
    plonkSound={null}
    keypressSound={null}
  />;
}

export default MathBlockContent