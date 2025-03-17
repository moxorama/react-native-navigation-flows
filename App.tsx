import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlowProvider } from './src/context/FlowContext';
import { Navigation } from './src/navigation/Navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <FlowProvider>
      <Navigation />
    </FlowProvider>
    </GestureHandlerRootView>
  );
}
