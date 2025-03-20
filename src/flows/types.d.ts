
type EventHandler = () => void;
type SourceHandlers = Record<string, EventHandler>;
type FlowHandlers = Record<string, SourceHandlers>;


type SubFlowHookReturn = {
  handleStart: () => void,
  handlers: FlowHandlers,
};

type SubFlowHookParams = {
  onComplete: () => void;
};

type SubFlowHook = (params: SubFlowHookParams) => SubFlowHookReturn;