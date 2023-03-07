import React, { useRef } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps } from '@renderer/common/types';

function MathBlockContent({content}: ValueProps) {
  const ref = useRef<MathViewRef>(null);

  return <MathView
    ref={ref}
    value={content ? content.latex : ""}
    className='math-field-element'
    inlineShortcuts={ML_SHORTCUTS}
    keybindings={ML_KEYBINDINGS}
    onExport={(ref, latex) => latex}
    plonkSound={null}
    keypressSound={null}
  />
}

export default MathBlockContent