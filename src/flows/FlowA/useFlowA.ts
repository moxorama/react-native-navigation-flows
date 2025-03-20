import { useNavigation, StackActions } from "@react-navigation/native";

import { useFlowContext } from "@/context/FlowContext";
import { useFlowController } from "@/context/useFlowController";
const flowName = "flowA";

function useFlowA () {
  const { currentFlow, completeFlow, completeFlowEvent } = useFlowContext();

  const navigation = useNavigation();

  const handleComplete = () => {
    console.log(`${currentFlow}/handleComplete`); 
    // В React Navigation 7 navigate = push, поэтому при возврате из flow через navigate будут копиться экраны
    const popToAction = StackActions.popTo("MainTabs", { 
      screen: "ProfileScreen"
    });
    navigation.dispatch(popToAction);
    completeFlow(flowName);
  };

  const handleAbort = () => {
    console.log(`${currentFlow}/handleAbort`);
    const popToAction = StackActions.popTo("MainTabs", { 
      screen: "HomeScreen"
    });
    navigation.dispatch(popToAction);
    completeFlow(flowName);
  }

  const handleHomeScreen = () => {
    console.log(`${currentFlow}/handleHomeScreen`);
    navigation.navigate("ScreenA");
  }

  const handleScreenA = () => {
    console.log(`${currentFlow}/handleScreenA`);
    navigation.navigate("ScreenB")
  };

  const handleScreenB = () => {
    console.log(`${currentFlow}/handleScreenB`);
    handleComplete();
  };

  const handleStart = () => {
    console.log(`${currentFlow}/handleStart`);
    completeFlowEvent();
    // Нет ничего - flow начинается при фокусе с экрана
  };

  const flowHandlers = {
    "HomeScreen" : {
      "next": handleHomeScreen,
    },
    "ScreenA": {
      "next": handleScreenA,
      "cancel": handleAbort,
    },
    "ScreenB": {
      "next": handleScreenB,
    },
  }

  useFlowController({
    flowName,
    flowHandlers,
    onAbort: handleAbort,
    onStart: handleStart,
  })
}

 

export { useFlowA };