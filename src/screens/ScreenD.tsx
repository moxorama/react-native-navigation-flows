import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';
import { useFlowContext } from '@/context/FlowContext';
type Props = NativeStackScreenProps<RootStackParamList, 'ScreenD'>;

export const ScreenD: React.FC<Props> = ({ navigation }) => {

  const { sendFlowEvent } = useFlowContext();

  return (
    <View style={styles.container}>
      <Text>Screen D</Text>
      <Button 
        title="Complete Subflow R"
        onPress={() => {
          sendFlowEvent({
            source: "ScreenD",
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});