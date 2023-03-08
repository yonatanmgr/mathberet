import React, { useEffect, useRef, useState } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps } from '@renderer/common/types';

function MathBlockContent({ content, blockStateFunction }: ValueProps) {
  const ref = useRef<MathViewRef>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    blockStateFunction(value);
  }, [value]);

  return (
    <MathView
      ref={ref}
      value={content ? content.latex : ''}
      className='math-field-element'
      inlineShortcuts={ML_SHORTCUTS}
      keybindings={ML_KEYBINDINGS}
      onChange={() => setValue(ref.current?.getValue())}
      onExport={(ref, latex) => latex}
      plonkSound={null}
      keypressSound={null}
    />
  );
}

export default MathBlockContent;
