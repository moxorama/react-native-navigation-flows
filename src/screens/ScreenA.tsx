import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useFlowContext } from '../context/FlowContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenA'>;

export const ScreenA = ({ navigation }: Props) => {
  const { sendFlowEvent } = useFlowContext();

  return (
    <View style={styles.container}>
      <Text>Screen A</Text>
      <Button 
        title="Flow event" 
        onPress={() => {
          sendFlowEvent({ source: "ScreenA", action: "next" });
        }}
      />
      <Button 
        title="About of flow event" 
        onPress={() => {
          sendFlowEvent({ source: "ScreenA", action: "cancel" });
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