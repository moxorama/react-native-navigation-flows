import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '@/navigation/types';
import { useFlowContext } from '@/context/FlowContext';

type Props = BottomTabScreenProps<TabParamList, 'ProfileScreen'>;

export const ProfileScreen = ({ navigation }: Props) => {
  const { startFlow, sendFlowEvent } = useFlowContext();

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button 
        title="Flow B event" 
        onPress={async () => {
          // Разделяем старт Flow и отправку события, потому что BottomSheet может быть закрыт, 
          // А flow - не прекращается
          await startFlow('flowB');
          sendFlowEvent({
            source: 'ProfileScreen',
            action: 'next',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});