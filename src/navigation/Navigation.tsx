import { NavigationContainer, NavigationState, useNavigationContainerRef, PartialState} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { ScreenA } from '@/screens/ScreenA';
import { ScreenB } from '@/screens/ScreenB';
import { ScreenC } from '@/screens/ScreenC';
import { ScreenD } from '@/screens/ScreenD';
import { ListScreen } from '@/screens/ListScreen';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList, TabParamList } from '@/navigation/types';
import { FlowA } from '@/flows/FlowA/FlowA';
import { FlowB } from '@/flows/FlowB/FlowB';
import { useFlowContext } from '@/context/FlowContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const getCurrentScreenName = (state: NavigationState | PartialState<NavigationState> | undefined): string => {
  if (!state || typeof state.index === 'undefined') return '';
  
  const route = state.routes[state.index];
  // If this route has a nested navigator, recursively get the current screen
  if (route.state) {
    return getCurrentScreenName(route.state);
  }
  // Otherwise return the current route name
  return route.name;
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="ListScreen" 
        component={ListScreen}
        options={{ 
          title: 'List',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ScreenA" 
        component={ScreenA}
        options={{ title: 'Screen A', gestureEnabled: false, headerBackVisible: false}}
      />
      <Stack.Screen 
        name="ScreenB" 
        component={ScreenB}
        options={{ title: 'Screen B' }}
      />
      <Stack.Screen 
        name="ScreenC" 
        component={ScreenC}
        options={{ title: 'Screen C' }}
      />
      <Stack.Screen 
        name="ScreenD" 
        component={ScreenD}
        options={{ title: 'Screen D' }}
      />
    </Stack.Navigator>
  );
}

export const Navigation = () => {
  const { setNavigationScreen } = useFlowContext();

  const handleStateChange = (state: NavigationState) => {
    const currentScreen = getCurrentScreenName(state);
    setNavigationScreen(currentScreen);
  }

  return (
    <NavigationContainer
      onStateChange={(state) => state && handleStateChange(state)}
    >
      <BottomSheetModalProvider>
        <FlowA />
        <FlowB />
        <RootStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};