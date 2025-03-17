import React from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useFlowContext } from '../context/FlowContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenB'>;

export const ScreenB = ({ navigation }: Props) => {
  const { sendFlowEvent } = useFlowContext();

  return (
    <View style={styles.container}>
      <Text>Screen B</Text>
      <Button 
        title="Flow event" 
        onPress={() => {
          sendFlowEvent({ source: "ScreenB", action: "next" });
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