import { useEffect, useRef } from "react";
import { useNavigation, StackActions } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useFlowContext } from "@/context/FlowContext";
import { useFlowController } from "@/context/useFlowController";

import { useSubFlowKYC } from "@/flows/shared/SubFlowKYC/useSubFlowKYC";

const flowName = "flowB";

function useFlowB () {
  const { currentFlow, completeFlow } = useFlowContext();


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

  const handleAbort = () => {
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

  const handleScreenC = () => {
    console.log(`${currentFlow}/handleScreenC`);
    handleSubFlowKYCStart();
  };


  const { 
    handleStart: handleSubFlowKYCStart,
    handlers: subFlowKYCHandlers,
  } = useSubFlowKYC({ onComplete: handleComplete });

 
  const flowHandlers = {
    ...subFlowKYCHandlers,
    "ProfileScreen": {
      "next": handleProfileScreen,
    },
    "ScreenC": {
      "next": handleScreenC,
    },
    "SheetA": {
      "next": handleSheetA,
    },
  };

  useFlowController({
    flowName,
    flowHandlers,
    onAbort: handleAbort,
    onStart: handleStart,
  })

  return {
    sheetARef,
    flowName,
  }
}

export { useFlowB };