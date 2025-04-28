# The Problem

In complex applications, navigation requirements often go beyond simple screen-to-screen transitions. Here are some common challenges this concept addresses:

## Context-Dependent Screen Behavior

The same screen can be part of different user flows depending on the context

Screen A -> Screen B -> Screen C

Screen D -> Screen B -> Screen E

In this case, the obvious solution would be to build complex redirect logic inside Screen B, passing parameters to it.

However, I propose a different approach: to move all the logic out separately and describe the entire sequence of screens, keeping the full context of the flow in one place.
The screens themselves would simply interact with this engine in a universal way.

In this setup, Screen B would simply send a “next” event, and the flow engine would determine which screen should come next based on the current flow context.

## Nested User Flows
- Sometimes, one user flow needs to be embedded within another flow
- Common examples include:
  - KYC verification as part of a payment flow
  - Address verification within a checkout process
  - Document upload as part of account setup 
