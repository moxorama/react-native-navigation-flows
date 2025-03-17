import React, { useCallback, useMemo, forwardRef } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { 
  BottomSheetView, 
  BottomSheetModal, 
  BottomSheetFooter,
  BottomSheetFooterProps 
} from '@gorhom/bottom-sheet';
import { useFlowContext } from '@/context/FlowContext';

export const SheetA = forwardRef<BottomSheetModal,{}>((props, ref) => {
  const snapPoints = useMemo(() => ['50%'], []);
  const { sendFlowEvent } = useFlowContext();


  const handlePressContinue = () => {
    ref?.current?.close();
    sendFlowEvent({
      source: 'SheetA',
      action: 'next',
    });
  };

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} style={styles.footer}>
        <View style={styles.footerContent}>
          <Button
            title="Next"
            onPress={handlePressContinue}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPoints}
      footerComponent={renderFooter}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Sheet A Content</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerContent: {
    padding: 16,
  },
});
