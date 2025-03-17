import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type FlowContextType = {
  navigationScreen: string;
  flowEventAction: string;
  flowEventSource: string;
  currentFlow: string;
  startFlow: (flowName: string) => void;
  completeFlow: (flowName: string) => void;
  sendFlowEvent: (params: { source: string; action: string }) => void;
  completeFlowEvent: () => void;
  setNavigationScreen: (screen: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [currentFlow, setCurrentFlow] = useState<string>('');
  const [flowEventAction, setFlowEventAction] = useState<string>('');
  const [flowEventSource, setFlowEventSource] = useState<string>('');
  const [navigationScreen, setNavigationScreen] = useState<string>('');

  const startFlow = (flowName: string) => {
    console.log(`startFlow/${flowName}`);
    setCurrentFlow(flowName);
  };

  const completeFlow = (flowName: string) => {
    if (currentFlow === flowName) {
      console.log(`completeFlow/${currentFlow}`);
      setCurrentFlow("");
      setFlowEventSource("");
      setFlowEventAction("");
    }
  };

  const sendFlowEvent = (params: { source: string; action: string }) => {
    const { source, action } = params;

    console.log(`flowAction, @${source}, ${action}`);
    setFlowEventSource(source);
    setFlowEventAction(action);
  };

  const completeFlowEvent = () => {
    setFlowEventSource("");
    setFlowEventAction("");
  }
 

  return (
    <FlowContext.Provider 
      value={{
        flowEventAction,
        flowEventSource,
        navigationScreen,
        currentFlow,
        startFlow,
        completeFlow,
        sendFlowEvent,
        completeFlowEvent,
        setNavigationScreen,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  return context;
};