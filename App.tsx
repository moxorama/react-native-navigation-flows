import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlowProvider } from '@/context/FlowContext';
import { Navigation } from '@/navigation/Navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <FlowProvider>
      <Navigation />
    </FlowProvider>
    </GestureHandlerRootView>
  );
}
