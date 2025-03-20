# Architectural Decisions

## Flow Structure
- Each flow has a unique name and its own hook that handles event processing
- The hook contains all the navigation logic for that specific flow
- This separation ensures that navigation logic is isolated and maintainable

## Event-Driven Navigation
The navigation system is built on a Finite State Machine (FSM) pattern where:

1. **Events Structure**
   - Each event consists of two parts:
     - `source`: The component that emitted the event (screen, bottom sheet, etc.)
     - `action`: The specific action that occurred (next, back, submit, etc.)
   ```typescript
   sendFlowEvent({
     source: 'PaymentScreen',
     action: 'next'
   });
   ```

   Since navigation can happen outside of flow control (e.g., swipe back gesture), each screen and bottom sheet must send events with its source identifier. This allows the flow to:
   - Track which component triggered the navigation
   - Handle navigation events consistently regardless of their origin
   - Maintain flow state even when navigation occurs through system gestures

   Note: event `abort` should be handled as universal flow abort

2. **State Transitions**
   - Each flow defines a set of valid state transitions
   - Events trigger transitions between states
   - The flow hook acts as the state machine controller
   ```typescript
   type FlowHandler = () => void;
   type FlowHandlers = Record<string, FlowHandler>;

   const flowHandlers: FlowHandlers = {
     'PaymentScreen': handlePaymentScreen,
     'ConfirmationScreen': handleConfirmationScreen
   };
   ```

3. **Flow abort**
  - Could be explicit - by sending 'abort' action from any source
  - Could be implicit - if current screen name (from react-navigation) does not exists in screen handlers


## Bottom Sheet Integration
- Some flow logic exists outside of regular screens in Bottom Sheets
- Each flow has its own component that:
  - Manages Bottom Sheets used in that flow
  - Provides refs to these Bottom Sheets to the flow's hook
  - Ensures proper coordination between screens and modal content

## Example Implementation

```typescript
// Flow Component
export const FlowB: React.FC = () => {
  const sheetARef = useRef<BottomSheetModal>(null);
  const { sheetARef } = useFlowB(sheetARef);
  
  return (
    <>
      <SheetA ref={sheetARef} />
      <SubFlowR />
    </>
  );
};

// Flow Hook
function useFlowB(sheetARef: RefObject<BottomSheetModal>) {
  const handleProfileScreen = () => {
    sheetARef.current?.present();
  };
  
  // ... other event handlers
  
  return { sheetARef };
}
``` 

## Future idea

```typescript

const flowHandlers = { 
  'ProfileScreen': {
    'next': () => navigation.navigate('SomeScreen'), // goSomeScreen() 
    'details': () => navigation.navigate('DetailsScreen'),
  }
}