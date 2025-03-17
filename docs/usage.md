# Usage Examples

## Basic Flow Operations

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