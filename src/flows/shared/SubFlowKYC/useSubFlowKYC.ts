import { useNavigation } from '@react-navigation/native';

const useSubFlowKYC: SubFlowHook = (params) => {
  const { onComplete } = params;
  const navigation = useNavigation();

  const handleScreenB = () => {
    navigation.navigate('ScreenD');
  };

  const handleScreenD = () => {
    onComplete();
  };

  const handleStart = () => {
    navigation.navigate('ScreenB');
  };

  const handlers = {
    "ScreenB": handleScreenB,
    "ScreenD": handleScreenD,
  };

  return {
    handleStart,
    handlers,
  }
}

export { useSubFlowKYC};