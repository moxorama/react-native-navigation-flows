# Complex Scenarios

## Flow-Specific Parameters
In a real application, you might need to pass flow-specific parameters:
```typescript
// Starting a flow with parameters
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

## State Management Integration
The FlowContext in this example is a simplified implementation. In a real application, you might want to:

1. Integrate with your app's state management solution (Redux, MobX, etc.)
2. Use selectors to make navigation decisions based on app state
3. Handle complex state dependencies between flows

Example with Redux:
```typescript
function usePaymentFlow() {
  const dispatch = useDispatch();
  const userBalance = useSelector(selectUserBalance);
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