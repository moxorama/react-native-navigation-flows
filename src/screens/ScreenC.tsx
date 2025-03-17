import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

import { useFlowContext } from '../context/FlowContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenC'>;

export const ScreenC = ({ navigation }: Props) => {
  const { sendFlowEvent } = useFlowContext();

  return (
    <View style={styles.container}>
      <Text>Screen C</Text>
      <Button 
        title="Go to Subflow R"
        onPress={() => {
          sendFlowEvent({
            source: "ScreenC",
            action: "next"
          })
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