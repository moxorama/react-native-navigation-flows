# Complex Navigation Flow Concept

This project demonstrates a solution for handling complex navigation flows in React Native applications, particularly addressing scenarios where traditional navigation patterns become insufficient.

## Documentation

- [The Problem](docs/problem.md) - Understanding the challenges this concept addresses
- [Architecture](docs/architecture.md) - Design decisions and implementation details
- [Flow Lifecycle](docs/lifecycle.md) - Understanding flow states and transitions
- [Complex Scenarios](docs/complex.md) - Advanced usage patterns and integrations
- [Usage Examples](docs/usage.md) - How to use the navigation system

## Quick Overview

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
