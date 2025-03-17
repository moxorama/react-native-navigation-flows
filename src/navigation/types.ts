import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  SheetA: undefined;
  ScreenA: undefined;
  ScreenB: undefined;
  ScreenC: undefined;
  ScreenD: undefined;
};

export type TabParamList = {
  ListScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;