type SubFlowHookReturn = {
  handleStart: () => void,
  handlers: {
    [key: string]: () => void
  }
};

type SubFlowHookParams = {
  onComplete: () => void;
};

type SubFlowHook = (params: SubFlowHookParams) => SubFlowHookReturn;