import { useEffect } from "react";
import { useFlowContext } from "../../context/FlowContext";
import { useNavigation, StackActions, useNavigationContainerRef } from "@react-navigation/native";

const flowName = "flowA";

function useFlowA () {
  const { currentFlow, flowEventAction, flowEventSource, completeFlow, completeFlowEvent, navigationScreen } = useFlowContext();

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

  const handleCancel = () => {
    console.log(`${currentFlow}/handleCancel`);
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
    "HomeScreen" : handleHomeScreen,
    "ScreenA": handleScreenA,
    "ScreenB": handleScreenB,
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

    if (flowEventAction === "cancel") {
      handleCancel();
      return;
    }

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
}

export { useFlowA };