import React from 'react';
import { View } from 'react-native';
import { SheetA } from '@/screens/SheetA';
import { useFlowB } from './useFlowB'
import { useFlowContext } from '@/context/FlowContext';
import { SubFlowKYC } from '@/flows/shared/SubFlowKYC/SubFlowKYC';
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
      <SubFlowKYC />
    </>
  );
}
