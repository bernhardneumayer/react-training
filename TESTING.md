# Testing Guide

## Overview

This project includes comprehensive tests for all exercises using **Test-Driven Development (TDD)** approach. Tests are written with Vitest and React Testing Library.

## Test Summary

| Session | Topic | Test File | Exercises | Status |
|---------|-------|-----------|-----------|--------|
| 1.1 | JSX Fundamentals | `01-Session1-JSX.test.tsx` | 4 | ✅ Ready |
| 1.2 | Props & TypeScript | `02-Session1-Props.test.tsx` | 5 | ✅ Ready |
| 1.4 | Lists & Keys | `03-Session1-Lists.test.tsx` | 7 | ✅ Ready |
| 1.5 | Event Handling | `04-Session1-Events.test.tsx` | 9 | ✅ Ready |
| 2.1 | useState Hook | `05-Session2-State.test.tsx` | 10 | ✅ Ready |
| 2.2 | useEffect Hook | `06-Session2-Effects.test.tsx` | 10 | ✅ Ready |
| 2.3 | useRef Hook | `07-Session2-Refs.test.tsx` | 11 | ✅ Ready |

**Total: 56 exercises with comprehensive test coverage**

## Running Tests

### Basic Commands

```bash
# Watch mode - automatically re-runs tests on file changes
npm test

# Run all tests once
npm test -- --run

# Run specific test file
npm test 03-Session1-Lists        # Lists exercises
npm test Props                     # Props exercises
npm test State                     # State exercises

# Run with visual UI
npm test:ui
```

### Filtering Tests

```bash
# Run only tests matching a pattern
npm test -- --run -t "should render"

# Run tests for specific exercise
npm test -- --run -t "Exercise 1"

# Run tests in a specific describe block
npm test -- --run -t "TransactionList"
```

## TDD Workflow

### 1. Red Phase (Failing Tests) ❌
- Tests start failing
- Read test descriptions to understand requirements
- Identify what needs to be implemented

### 2. Green Phase (Implementation) ✅
- Write code to make tests pass
- Focus on making tests green, not perfection
- Iterate until all tests pass

### 3. Refactor Phase (Improvement) 🔄
- Clean up your code
- Improve readability
- Tests ensure you don't break functionality

## Test Structure

Each test file follows this structure:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Exercise 1: ComponentName', () => {
  it('should describe what is being tested', () => {
    // Arrange - Set up test data
    render(<ComponentName />)

    // Act - Perform actions
    const button = screen.getByRole('button')

    // Assert - Verify results
    expect(button).toBeInTheDocument()
  })
})
```

## What Tests Verify

### JSX Fundamentals
- Valid JSX syntax (no multiple roots)
- Conditional rendering works
- Expressions (not statements) in JSX
- Dynamic value interpolation

### Props & TypeScript
- Props are passed correctly
- TypeScript types are enforced
- Default props work
- Children prop accepted
- Rest props pattern (...rest)

### Lists & Keys
- Lists render correctly
- Proper keys used (not index)
- Empty state handling
- Filtering works
- Interactive list items
- Nested lists with keys

### Event Handling
- Event handlers attached
- State updates on events
- preventDefault() called on forms
- Data passed to handlers
- Keyboard events handled
- Event bubbling controlled
- Multiple event types

### useState Hook
- Initial state set
- State updates correctly
- Immutable array updates
- Immutable object updates
- Derived state calculated
- Lazy initialization used
- Complex state management

### useEffect Hook
- Effects run on mount
- Cleanup on unmount
- Dependencies specified correctly
- No infinite loops
- localStorage sync
- Event listener cleanup
- API calls with loading states

### useRef Hook
- DOM elements accessed
- Focus management works
- Scroll behavior controlled
- Element measurements accurate
- Mutable values stored
- No unnecessary re-renders
- Interval IDs tracked

## Common Test Patterns

### Testing User Interactions

```typescript
it('should increment counter on click', async () => {
  const user = userEvent.setup()
  render(<Counter />)

  const button = screen.getByRole('button')
  await user.click(button)

  expect(screen.getByText(/1/)).toBeInTheDocument()
})
```

### Testing Forms

```typescript
it('should submit form with values', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  const emailInput = screen.getByLabelText(/email/i)
  const submitButton = screen.getByRole('button', { name: /submit/i })

  await user.type(emailInput, 'test@example.com')
  await user.click(submitButton)

  expect(screen.getByText(/success/i)).toBeInTheDocument()
})
```

### Testing Async Operations

```typescript
it('should fetch and display data', async () => {
  render(<UserProfile />)

  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  // Check data is displayed
  expect(screen.getByText(/john doe/i)).toBeInTheDocument()
})
```

### Testing Effects with Timers

```typescript
it('should update timer value', () => {
  vi.useFakeTimers()
  render(<Timer />)

  vi.advanceTimersByTime(1000)

  expect(screen.getByText(/1/)).toBeInTheDocument()

  vi.restoreAllMocks()
})
```

## Test Results Interpretation

### Current Status (Before Implementation)
```
Test Files  7 failed (7)
Tests       88 failed | 100 passed (188)
```

This is **expected and correct** for TDD:
- 88 tests failing = 88 implementation tasks
- 100 tests passing = tests for completed exercises
- As you implement, failing tests will turn green

### Target (After Implementation)
```
Test Files  7 passed (7)
Tests       188 passed (188)
```

## Debugging Failed Tests

### 1. Read the Error Message
```
× should render a list of transactions
  AssertionError: expected 0 to be greater than 0

  expect(list?.children.length).toBeGreaterThan(0)
```
**Meaning**: The list has no children - implement the `.map()` to render items

### 2. Check Test Description
The test name tells you what to implement:
- "should use proper keys" → Add `key` prop to list items
- "should prevent default" → Add `e.preventDefault()` in form handler
- "should cleanup on unmount" → Return cleanup function from useEffect

### 3. Look at the Test Code
Tests show you exactly what's expected:
```typescript
expect(screen.getByText(/Grocery Store/i)).toBeInTheDocument()
```
This means your component should render text containing "Grocery Store"

### 4. Run Single Test for Focus
```bash
npm test -- --run -t "should render a list"
```

## Best Practices

### ✅ Do
- Read test descriptions before implementing
- Run tests frequently (use watch mode)
- Make one test pass at a time
- Use tests to guide your implementation
- Commit when tests turn green

### ❌ Don't
- Skip reading failing tests
- Try to make all tests pass at once
- Change test code to make tests pass
- Ignore test warnings
- Commit with failing tests (unless intentional)

## Getting Help

### Test is Failing but Code Looks Right
1. Check if component is exported correctly
2. Verify prop names match
3. Look for typos in text content
4. Check console for errors
5. Read full error message

### Test is Unclear
1. Look at the test code
2. Check similar exercises
3. Ask during training session
4. Compare with solution files

### All Tests Timeout
1. Check for infinite loops
2. Verify useEffect dependencies
3. Ensure async operations complete
4. Check if cleanup functions are called

## Tips for Success

1. **Start with simplest tests first** - Build confidence
2. **Read error messages carefully** - They tell you what to do
3. **One test at a time** - Don't overwhelm yourself
4. **Use watch mode** - Instant feedback
5. **Green is good** - Celebrate passing tests!
6. **Red is information** - Tells you what's missing

## Advanced: Writing Your Own Tests

If you want to add more tests:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('My Component', () => {
  it('should do something specific', () => {
    render(<MyComponent />)
    expect(screen.getByText(/expected text/i)).toBeInTheDocument()
  })
})
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)

---

Happy Testing! 🧪✨
