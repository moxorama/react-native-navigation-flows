# Complex Navigation Flow Concept

This project demonstrates a solution for handling complex navigation flows in React Native applications, particularly addressing scenarios where traditional navigation patterns become insufficient.

## The Problem

In complex applications, navigation requirements often go beyond simple screen-to-screen transitions. Here are some common challenges this concept addresses:

### 1. Context-Dependent Screen Behavior
- The same screen can be part of different user flows depending on the context
- For example, a "Profile" screen might behave differently when accessed from:
  - Main navigation
  - Settings flow
  - Onboarding flow
  - Payment verification flow

### 2. Nested User Flows
- Sometimes, one user flow needs to be embedded within another flow
- Common examples include:
  - KYC verification as part of a payment flow
  - Address verification within a checkout process
  - Document upload as part of account setup

## The Solution

This concept implements a flow-based navigation system that:

1. Separates navigation logic from screen components
2. Allows screens to be reused across different flows
3. Provides a way to embed flows within other flows
4. Maintains clear flow state and transitions

### Key Features

- **Flow Context**: Manages the current active flow and its state
- **Flow Events**: Handles communication between screens and flows
- **Nested Flows**: Supports embedding flows within other flows
- **Screen Reusability**: Allows screens to be used in multiple flows with different behaviors
- **Type Safety**: Full TypeScript support for flow and navigation types

## Architectural Decisions

### Flow Structure
- Each flow has a unique name and its own hook that handles event processing
- The hook contains all the navigation logic for that specific flow
- This separation ensures that navigation logic is isolated and maintainable

### Event-Driven Navigation
- Screens are decoupled from navigation logic
- Instead of directly navigating, screens emit events
- The current flow's hook listens for these events and determines the next navigation step
- This approach allows the same screen to be used in different flows with different behaviors

### Bottom Sheet Integration
- Some flow logic exists outside of regular screens in Bottom Sheets
- Each flow has its own component that:
  - Manages Bottom Sheets used in that flow
  - Provides refs to these Bottom Sheets to the flow's hook
  - Ensures proper coordination between screens and modal content

Example of a flow structure:
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

## Real-World Considerations

### Flow-Specific Parameters
In a real application, you might need to pass flow-specific parameters:
```typescript
// Starting a flow with parameters - not implemented in this concept
startFlow('paymentFlow', { 
  amount: 1000,
  currency: 'USD',
  paymentMethod: 'card'
});

// Flow hook with parameters
function usePaymentFlow(params: PaymentFlowParams) {
  const handleAmountScreen = () => {
    // Use params.amount for calculations
  };
  // ...
}
```

### State Management Integration
The FlowContext in this example is a simplified implementation. In a real application, you might want to:

1. Integrate with your app's state management solution (Redux, MobX, etc.)
2. Use selectors to make navigation decisions based on app state
3. Handle complex state dependencies between flows

Example with Redux:
```typescript
function usePaymentFlow() {
  const dispatch = useDispatch();
  const kycStatus = useSelector(selectKYCStatus);

  const handleComplete = () => {
    //...
  }

  const { 
    handlers: kycFlowRHandlers, 
    handleStart: handleSubFlowKYCStart 
  } = useSubFlowKYC(handleComplete);

  const handlePaymentScreen = () => {
    if (kycStatus !== 'verified') {
      handleSubFlowKYCStart();
      return;
    }
    navigation.navigation('PaymentScreen');
  };
  // ...
}
```

## Example Usage

```typescript
// Starting a flow
startFlow('flowB');

// Sending events within a flow
sendFlowEvent({
  source: 'ProfileScreen',
  action: 'next'
});

// Handling flow completion
completeFlow('flowB');
```

## Project Structure

```
src/
├── context/
│   └── FlowContext.tsx      # Flow management context
├── flows/
│   ├── FlowA/              # Example flow implementation
│   └── FlowB/              # Another flow with nested subflow
├── navigation/
│   └── Navigation.tsx      # Main navigation setup
└── screens/                # Reusable screen components
```

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start
```

## License

MIT
