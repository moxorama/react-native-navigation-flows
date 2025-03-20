import { useEffect } from "react";
import { useFlowContext } from "@/context/FlowContext"
import _ from "lodash";


const useFlowController = (params: {
  flowName: string;
  flowHandlers: FlowHandlers;
  onStart?: () => void;
  onAbort?: () => void;
}) => {
  const { flowName, flowHandlers, onStart, onAbort } = params;

  const { currentFlow, flowEventAction, flowEventSource, completeFlow, navigationScreen, completeFlowEvent } = useFlowContext();

  useEffect(() => {
    if (currentFlow !== flowName) {
      return;
    }

    if ((flowEventAction === "") && (flowEventSource === "")) {
      return;
    }

    if (_.isNil(flowHandlers?.[flowEventSource]?.[flowEventAction])) {
      return;
    }

    flowHandlers[flowEventSource][flowEventAction]();
    completeFlowEvent();

  },[flowEventAction, flowEventSource]);

  useEffect(() => {
    if (currentFlow === flowName) {
      if (onStart) {
        onStart();
      }
      return;
    }    
  },[currentFlow, flowName]);

  useEffect(() => {
    if (currentFlow !== flowName) {
      return;
    }

    // Если мы прервали flow, то вызываем onAbort и завершаем flow
    if (flowEventAction === "abort") {
      if (onAbort) {
        onAbort();
      }
      completeFlow(flowName);
      return;
    }

    // Еcли мы на экране, который не входит в flow, то просто выходим
    if (!(navigationScreen in flowHandlers)) {
      completeFlow(flowName);
    }
  
  },[currentFlow, flowName, flowEventAction, navigationScreen]);
}

export { useFlowController };