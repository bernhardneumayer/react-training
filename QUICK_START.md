# Quick Start - Working with Exercises

## 🚀 Simple Workflow

### Step 1: Import the exercises you want to work on

```tsx
// At the top of App.tsx
import { Counter, NameInput, TodoList } from './exercises/05-Session2-State'
```

### Step 2: Render exercises to test them

```tsx
function App() {
  return (
    <div>
      {/* <Counter /> */}     {/* Done */}
      <NameInput />            {/* Working on this */}
      {/* <TodoList /> */}     {/* Not started */}
    </div>
  )
}
```

That's it! Change the import when switching sessions.

---

## 📋 Import Reference by Session

Just copy-paste the import you need!

### Session 1.1 - JSX Fundamentals
```tsx
import { BrokenComponent, WelcomeCard, ExpressionPractice, UserProfile } from './exercises/01-Session1-JSX'
```

### Session 1.2 - Props
```tsx
import { Button, UserCard, Badge, Card, Input } from './exercises/02-Session1-Props'
```

### Session 1.4 - Lists
```tsx
import { TransactionList, FilteredTransactionList, InteractiveTransactionList } from './exercises/03-Session1-Lists'
```

### Session 1.5 - Events
```tsx
import { ClickCounter, ControlledInput, LoginForm, KeyboardHandler } from './exercises/04-Session1-Events'
```

### Session 2.1 - useState
```tsx
import { Counter, NameInput, TodoList, ShoppingCart } from './exercises/05-Session2-State'
```

### Session 2.2 - useEffect
```tsx
import { UserProfile, Timer, SearchInput, ChatRoom } from './exercises/06-Session2-Effects'
```

### Session 2.3 - useRef
```tsx
import { AutoFocusInput, StopwatchWithRef, VideoPlayer, ClickOutsideDemo } from './exercises/07-Session2-Refs'
```

---

## 💡 Pro Tips

### Tip 1: Work on One Session at a Time

```tsx
// ✅ Good - Clean and focused
import { Counter, NameInput } from './exercises/05-Session2-State'

function App() {
  return (
    <div>
      <Counter />
      <NameInput />
    </div>
  )
}

// ❌ Avoid - Mixing sessions (confusing)
import { WelcomeCard } from './exercises/01-Session1-JSX'
import { Counter } from './exercises/05-Session2-State'
import { Timer } from './exercises/06-Session2-Effects'
```

### Tip 2: Test One Exercise at a Time

```tsx
function App() {
  return (
    <div>
      {/* Completed exercises - commented out */}
      {/* <Counter /> */}
      {/* <NameInput /> */}

      {/* Current exercise - visible */}
      <TodoList />

      {/* Future exercises - commented out */}
      {/* <ShoppingCart /> */}
    </div>
  )
}
```

### Tip 3: Use IntelliJ IDEA Split View

```
┌─────────────────────┬─────────────────────┐
│  App.tsx            │  Exercise file      │
│  (config + render)  │  (implementation)   │
│                     │                     │
│  Switch session →   │  ← Work here        │
└─────────────────────┴─────────────────────┘
```

**How to split:**
- Drag file tab to right side of editor
- Or: Right-click tab → "Split Right"

---

## 🔄 Workflow Summary

```
1. Open App.tsx
   ↓
2. Update SESSION config (3 lines)
   ↓
3. Uncomment session import
   ↓
4. Open exercise file in split view
   ↓
5. Work on exercise
   ↓
6. Uncomment exercise in App.tsx to test
   ↓
7. Check browser
   ↓
8. Repeat for next exercise
```

---

## ❓ Troubleshooting

**Q: Import error - "Module not found"**
- Check the file path matches SESSION.file
- Make sure you uncommented the import

**Q: Nothing shows in browser**
- Check you uncommented the component in App.tsx
- Look for errors in browser console
- Make sure dev server is running (`npm run dev`)

**Q: Wrong session showing**
- Update SESSION config at top of App.tsx
- Clear old imports
- Save the file

**Q: Can't find exercises**
- Files are in `src/exercises/`
- Numbered: `01-`, `02-`, `03-`, etc.
- Use Double Shift in IntelliJ IDEA to quick-search files

---

## 📱 Quick Commands

```bash
# Start dev server
npm run dev
```

---

## 🎯 Example: Switching from Session 2 to Session 3

```tsx
// BEFORE (Session 2.1 - JSX)
import { WelcomeCard } from './exercises/01-Session1-JSX'

function App() {
  return (
    <div>
      <WelcomeCard />
    </div>
  )
}

// AFTER (Session 3.1 - useState)
import { Counter, NameInput } from './exercises/05-Session2-State'

function App() {
  return (
    <div>
      <Counter />
      <NameInput />
    </div>
  )
}
```

Just change the import and what you render. Simple! 🎉

---

That's it! You're ready to switch between any session quickly. Happy coding! 🚀
