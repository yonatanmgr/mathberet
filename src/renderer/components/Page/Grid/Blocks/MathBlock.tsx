import React, { useEffect, useRef, useState } from 'react';
import MathView, { MathViewRef } from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps } from '@renderer/common/types';

function MathBlockContent({ content, blockStateFunction }: ValueProps) {
  const defaultValue = '';
  const ref = useRef<MathViewRef>(null);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    blockStateFunction(value);
  }, [value]);

  return (
    <MathView
      ref={ref}
      value={content ? (typeof content.latex != 'object' ? content.latex : defaultValue): defaultValue}
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
