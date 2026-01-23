# Workflow Guide - How to Use the Exercises

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   Recommended Workflow                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Edit exercise file     2. Import to App.tsx            │
│     ┌──────────────┐          ┌──────────────┐             │
│     │ Exercise.tsx │          │   App.tsx    │             │
│     │              │─────────▶│              │             │
│     │ Implement    │  import  │ Test & View  │             │
│     │ your code    │          │              │             │
│     └──────────────┘          └──────┬───────┘             │
│                                      │                     │
│                                      ▼                     │
│                               3. See in browser            │
│                                 localhost:5173             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## For Participants (Learning)

### Recommended: Work in Exercise Files

This is the best approach for keeping your work organized:

**Step 1: Open an exercise file**
```bash
# Open in VS Code
code src/exercises/Session3-State.tsx
```

**Step 2: Find the exercise and implement it**
```tsx
// In Session3-State.tsx
export function Counter() {
  // TODO: Add state for count
  const [count, setCount] = useState(0)  // ← Implement here

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

**Step 3: Import to App.tsx**
```tsx
// In src/App.tsx
import { Counter } from './exercises/05-Session3-State'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>
      <Counter />
    </div>
  )
}
```

**Step 4: Check the browser**
- Save both files
- Browser auto-reloads
- Test your implementation

**Step 5: Move to next exercise**
- Comment out previous exercise in App.tsx
- Implement next one
- Import and test

Example of working through multiple exercises:
```tsx
// src/App.tsx
import { Counter } from './exercises/05-Session3-State'
import { NameInput } from './exercises/05-Session3-State'
import { TodoList } from './exercises/05-Session3-State'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>

      {/* Exercise 1 - Done ✓ */}
      {/* <Counter /> */}

      {/* Exercise 2 - Done ✓ */}
      {/* <NameInput /> */}

      {/* Exercise 5 - Currently working on */}
      <TodoList />
    </div>
  )
}
```

---

## For Instructors (Live Coding)

### During Sessions: Use App.tsx Directly

**For live demonstrations:**

1. **Clear App.tsx** before each session:
```tsx
function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>
      {/* Start fresh here */}
    </div>
  )
}
```

2. **Type code live** while explaining:
```tsx
import { useState } from 'react'

function App() {
  // Type this live while screen sharing
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Counter Demo</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

3. **Show mistakes intentionally**:
```tsx
// Show what happens when you forget useState
function App() {
  let count = 0  // ← Show this doesn't work!

  return (
    <button onClick={() => count++}>
      Count: {count}  {/* Won't update! */}
    </button>
  )
}
```

4. **Then import exercises to show solutions**:
```tsx
import { Counter } from './solutions/05-Session3-State-Solutions'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 Here's how to do it right:</h1>
      <Counter />
    </div>
  )
}
```

---

## Common Workflow Patterns

### Pattern 1: Focus on One Exercise at a Time

```tsx
// App.tsx - Clean and focused
import { CurrentExercise } from './exercises/05-Session3-State'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>
      <CurrentExercise />
    </div>
  )
}
```

**When to use:** Deep dive on a single concept

---

### Pattern 2: Show Multiple Examples

```tsx
// App.tsx - Compare different approaches
import { Counter } from './exercises/05-Session3-State'
import { FastCounter } from './exercises/05-Session3-State'

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>

      <h2>Regular Counter</h2>
      <Counter />

      <hr />

      <h2>Functional Updates Counter</h2>
      <FastCounter />
    </div>
  )
}
```

**When to use:** Comparing different techniques

---

### Pattern 3: Build Progressively

```tsx
// App.tsx - Show evolution of a component
function App() {
  // Version 1: Static
  return <button>Click me</button>

  // Version 2: With console.log
  // return <button onClick={() => console.log('clicked')}>Click me</button>

  // Version 3: With state (uncomment after explaining useState)
  // const [count, setCount] = useState(0)
  // return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

**When to use:** Teaching progression of concepts

---

## File Organization Tips

### Keep Your Work Organized

```
src/
├── App.tsx                        # Your testing area (changes often)
├── exercises/
│   ├── 01-Session2-JSX.tsx        # Your implementations (keep these!)
│   ├── 02-Session2-Props.tsx      # ✓ Completed
│   └── 05-Session3-State.tsx      # 🚧 Working on this
└── solutions/
    └── ...                        # Reference only
```

### Git Workflow (Optional)

If you want to save your progress:

```bash
# After completing exercises
git add src/exercises/05-Session3-State.tsx
git commit -m "Complete useState exercises"

# Create a branch for experiments
git checkout -b my-experiments
# Now App.tsx changes won't affect your main work
```

---

## VS Code Tips for Workflow

### Split View for Efficiency

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│  Exercise file       │  App.tsx             │
│  (implementation)    │  (testing)           │
│                      │                      │
│  Edit here →         │  ← Import here       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**How to split:**
- Drag tab to side of editor
- Or: Right-click tab → "Split Right"

### Quick File Navigation

```bash
Cmd/Ctrl + P          # Quick open file
Cmd/Ctrl + Tab        # Switch between recent files
Cmd/Ctrl + B          # Toggle sidebar
```

### Multi-Cursor Editing

```bash
Option/Alt + Click    # Add cursor
Cmd/Ctrl + D          # Select next occurrence
Cmd/Ctrl + Shift + L  # Select all occurrences
```

---

## Troubleshooting Workflow Issues

### "I edited the exercise but nothing happens"

**Check:**
1. Is the exercise imported in App.tsx?
   ```tsx
   import { MyExercise } from './exercises/05-Session3-State'  // ✓
   ```

2. Is it rendered in the return statement?
   ```tsx
   return <MyExercise />  // ✓
   ```

3. Did you save both files? (Auto-save helps!)

---

### "Too many exercises in App.tsx - it's messy"

**Solution:** Comment out completed ones:

```tsx
function App() {
  return (
    <div>
      {/* Session 2 - Completed */}
      {/* <Counter /> */}
      {/* <NameInput /> */}

      {/* Session 3 - Currently working */}
      <TodoList />
    </div>
  )
}
```

---

### "I want to start fresh"

**Reset App.tsx:**

```tsx
function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>
      <p>Ready to learn React! 🚀</p>
    </div>
  )
}
```

Your exercise files are safe - App.tsx is just for viewing!

---

## Quick Reference

| Task | File to Edit | File to View |
|------|--------------|--------------|
| Implement exercise | `src/exercises/*.tsx` | `src/App.tsx` |
| Live coding demo | `src/App.tsx` | Browser |
| Check solution | N/A (read only) | `src/solutions/*.tsx` |
| Test multiple exercises | `src/exercises/*.tsx` | `src/App.tsx` (import all) |

---

## Recommended Daily Workflow

**Before each session:**
```tsx
// 1. Clear App.tsx
function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📚 React Training</h1>
    </div>
  )
}

// 2. Follow along with instructor
// 3. Try exercises after demo
```

**During exercises:**
```tsx
// 1. Open exercise file
// 2. Find TODO
// 3. Implement
// 4. Import to App.tsx
// 5. Test in browser
// 6. Repeat!
```

**After each session:**
```bash
# Optional: Commit your progress
git add src/exercises/
git commit -m "Complete Session X exercises"
```

---

## Summary

✅ **Do:** Work in exercise files, import to App.tsx to test
✅ **Do:** Keep App.tsx clean and focused
✅ **Do:** Comment out completed exercises
✅ **Do:** Use split view for efficiency

❌ **Don't:** Delete exercise files
❌ **Don't:** Copy solutions without understanding
❌ **Don't:** Skip testing in browser

Happy coding! 🚀
