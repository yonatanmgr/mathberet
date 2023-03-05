import React from 'react';
import MathView from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';

function MathBlockContent() {
    return <MathView
      className='math-field-element'
      inlineShortcuts={ML_SHORTCUTS}
      onExport={(mf, latex) => `${latex}`}
      plonkSound={null}
      keypressSound={null}

    />;
  }

export default MathBlockContent