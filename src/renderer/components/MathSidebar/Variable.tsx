import React from 'react';
import { VariableProps } from '@renderer/common/types';
import MathView from 'react-math-view';

const MathSidebar = ({blockId, definition}: VariableProps) => {
    return <MathView
    value={`${Object.keys(definition)[0]} = ${Object.values(definition)[0]}`}
    className='math-field-element'
    readOnly
  />
  };
  
  export default MathSidebar;
  