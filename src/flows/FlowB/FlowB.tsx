import React from 'react';

import { SheetA } from '../../screens/SheetA';
import { useFlowB } from './useFlowB'
import { useFlowContext } from '../../context/FlowContext';
import SubFlowR from '../shared/SubFlowR/SubFlowR';
export const FlowB: React.FC = () => {
  const { currentFlow } = useFlowContext();

  const { 
    sheetARef,
    flowName
  } = useFlowB();


  if (currentFlow !== flowName) {
    return null;
  }

  return (
    <>
      <SheetA ref={sheetARef} />
      <SubFlowR />
    </>
  );
}
