import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/named
import MathView, { MathViewRef } from 'react-math-view';
import ML_SHORTCUTS from '@common/shortcuts';
import ML_KEYBINDINGS from '@common/keybindings';
import { ValueProps, VariableProps } from '@renderer/common/types';
import { useGeneralContext } from '@components/GeneralContext';

function MathBlockContent({ content, blockStateFunction }: ValueProps) {
  const defaultValue = '';
  const ref = useRef<MathViewRef>(null);
  const [value, setValue] = useState(defaultValue);
  const { currentVariables, setCurrentVariables } = useGeneralContext();

  useEffect(() => {
    blockStateFunction(value);
    if (value.split("\\coloneq").length != 1 &&
      value.split("\\coloneq")[1] != '' &&
      value.split("\\coloneq")[0] != ''
    ) {
      const assignment = { 
        blockId: ref.current.parentElement.parentElement.id, 
        definition: { [value.split("\\coloneq")[0]]: value.split("\\coloneq")[1] } 
      }
      
      if (!currentVariables.some((variable: VariableProps) => JSON.stringify(variable) === JSON.stringify(assignment))) {
        if (currentVariables.find((variable: VariableProps) => variable.blockId == assignment.blockId)) {
          const updatedVariables = currentVariables.map((variable: VariableProps) => {
            if (variable.blockId == assignment.blockId) {
              return { ...variable, definition: assignment.definition };
            }
            return variable;
          });
          setCurrentVariables(updatedVariables);
        } else setCurrentVariables([...currentVariables, assignment]);
      }
    }

  }, [value]);

  return (
    <MathView
      ref={ref}
      value={content ? content.toString() : defaultValue}
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
