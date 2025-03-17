import { useEffect, useRef } from "react";
import { useNavigation, StackActions } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useFlowContext } from "../../context/FlowContext";

import { useSubFlowR } from "../shared/SubFlowR/useSubFlowR";


const flowName = "flowB";

function useFlowB () {
  const { currentFlow, completeFlow, flowEventSource, flowEventAction, completeFlowEvent, navigationScreen } = useFlowContext();


  const navigation = useNavigation();

  const sheetARef = useRef<BottomSheetModal>(null);

  const handleComplete = () => {
    console.log(`${currentFlow}/handleComplete`); 
    // В React Navigation 7 navigate = push, поэтому при возврате из flow через navigate будут копиться экраны
    const popToAction = StackActions.popTo("MainTabs", { 
      screen: "ProfileScreen"
    });
    navigation.dispatch(popToAction);
    completeFlow(flowName);
  }  

  const handleCancel = () => {
    const popToAction = StackActions.popTo("MainTabs", { 
      screen: "ProfileScreen"
    });
    navigation.dispatch(popToAction);
  }

  const handleStart = () => {
    console.log(`${currentFlow}/handleStart`);
  }

  const handleProfileScreen = () => {
    console.log(`${currentFlow}/handleScreenB`);
    sheetARef.current?.present()
  } 

  const handleSheetA = () => {
    console.log(`${currentFlow}/handleSheetA`);
    navigation.navigate("ScreenC");
  };


  const { 
    handlers: subFlowRHandlers, 
    handleStart: handleSubFlowRStart 
  } = useSubFlowR(handleComplete);

  const handleScreenC = () => {
    console.log(`${currentFlow}/handleScreenC`);
    handleSubFlowRStart();
  };


  const flowHandlers = {
    ...subFlowRHandlers,
    "ProfileScreen": handleProfileScreen,
    "ScreenC": handleScreenC,
    "SheetA": handleSheetA,
  }

  const shouldAbortFlow = () => {
    return !(navigationScreen in flowHandlers);
  }

  useEffect(() => {
    if (currentFlow !== flowName ) {
      return;
    }


    if ((flowEventSource === "") || (flowEventAction === "")) {
      return;
    }
    
    const handler = flowHandlers[flowEventSource as keyof typeof flowHandlers];

    if (handler) {
      handler();
      completeFlowEvent();
    }

  }, [currentFlow, flowEventSource, flowEventAction]);


  useEffect(() => {
    if (currentFlow === flowName) {
      handleStart();
    }
  }, [currentFlow]);


  useEffect(() => {
    if (currentFlow !== flowName) {
      return;
    }

    if (shouldAbortFlow()) {
      completeFlow(flowName);
      return;
    }
  }, [navigationScreen, currentFlow]);
  


  return {
    sheetARef,
    flowName,
  }
}

export { useFlowB };