import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useFlowContext } from '@/context/FlowContext';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const { startFlow, sendFlowEvent } = useFlowContext();

  useEffect(() => {
    if (isFocused) {
      startFlow("flowA");
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button 
        title="Flow A event" 
        onPress={() => {
          sendFlowEvent({ source: "HomeScreen", action: "next" });
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
