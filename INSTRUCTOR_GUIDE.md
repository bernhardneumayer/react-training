# Instructor Guide - React Training

## Pre-Session Setup Checklist

### Before Session 1

- [ ] Clone this repository to your machine
- [ ] Run `npm install` and `npm run dev` to verify setup works
- [ ] Test that hot reload is working (edit App.tsx and save)
- [ ] Install React DevTools extension in your browser
- [ ] Increase IntelliJ IDEA font size for screen sharing (18-20px recommended)
- [ ] Set up dual screen: IntelliJ IDEA on left, Browser on right
- [ ] Have Cousteau Storybook URL ready for Session 1.6

### IntelliJ IDEA Settings for Live Coding

**Recommended settings for screen sharing:**
- **Font Size**: Settings → Editor → Font → Size: 18-20
- **Line Height**: Settings → Editor → Font → Line height: 1.6
- **Presentation Mode**: View → Appearance → Enter Presentation Mode (increases font automatically)
- **Disable Distractions**: View → Appearance → Distraction Free Mode
- **Terminal Font**: Settings → Editor → Color Scheme → Console Font → Size: 16

## Session-by-Session Guide

### Session 1.1 - JSX Fundamentals (15 min)

**What to demo in App.tsx:**

```tsx
// Start simple
function App() {
  const name = 'Backend Engineer'
  const isActive = true

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}
```

**Common mistakes to show:**
- Missing wrapper div (show the error!)
- Using `class` instead of `className`
- Unclosed tags
- Trying to use `if` statements instead of ternary

**Exercise to assign:** `src/exercises/01-Session1-JSX.tsx`

---

### Session 1.2 - Props (20 min)

**Live coding flow:**

```tsx
// 1. Start with inline component
function App() {
  return (
    <div>
      <button>Click me</button>
    </div>
  )
}

// 2. Extract to component with props
interface ButtonProps {
  label: string
  onClick: () => void
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

function App() {
  const handleClick = () => {
    console.log('Clicked!')
  }

  return (
    <div>
      <Button label="Click me" onClick={handleClick} />
      <Button label="Delete" onClick={() => console.log('Delete')} />
    </div>
  )
}
```

**Key points to emphasize:**
- Props are read-only (like function parameters)
- TypeScript helps catch missing/wrong props
- Destructuring makes code cleaner
- Functions can be passed as props

**Exercise to assign:** `src/exercises/02-Session1-Props.tsx`

---

### Session 1.3 - Conditional Rendering (15 min)

**Patterns to demonstrate:**

```tsx
function App() {
  const isLoggedIn = false
  const count = 0
  const items = ['a', 'b', 'c']

  return (
    <div>
      {/* Pattern 1: Ternary */}
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please login</p>}

      {/* Pattern 2: && for show/hide */}
      {isLoggedIn && <button>Logout</button>}

      {/* Pattern 3: Early return */}
      {/* Show in separate component */}

      {/* GOTCHA: Show why count && <Badge /> is bad */}
      {count && <span>Count: {count}</span>}  {/* Shows "0"! */}
      {count > 0 && <span>Count: {count}</span>}  {/* Correct */}
    </div>
  )
}
```

---

### Session 1.4 - Lists and Keys (20 min)

**Live coding with real data:**

```tsx
interface User {
  id: string
  name: string
  email: string
}

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
]

function App() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  )
}
```

**Demonstrate key mistakes:**
1. No key (show console warning)
2. Index as key (explain why it's problematic)
3. Non-unique key (show what happens)

**Exercise to assign:** `src/exercises/03-Session1-Lists.tsx`

---

### Session 1.5 - Event Handling (10 min)

**Quick demos:**

```tsx
function App() {
  const handleClick = () => {
    console.log('Clicked!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Value:', e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // Emphasize this!
    console.log('Form submitted')
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <input onChange={handleChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
```

**Exercise to assign:** `src/exercises/04-Session1-Events.tsx`

---

### Session 2.6 - NXD Preview (10 min)

**Switch to Cousteau!**

1. Open Cousteau Storybook in browser
2. Browse components: Button, Card, Input, Stack
3. Show prop controls and variants
4. Show code examples in Storybook
5. Explain: "These are just React components using the patterns you learned"

**Key message:**
> "You've been learning with basic HTML elements. In Cousteau, you'll use these pre-built components. Same React patterns, just styled and tested."

---

### Session 2.1 - useState (25 min)

**Start with counter:**

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}
```

**Then show controlled input:**

```tsx
function NameInput() {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello, {name}!</p>
    </div>
  )
}
```

**Important concepts to cover:**
- State triggers re-renders
- State is isolated per component instance
- Don't mutate state directly
- Functional updates when using previous state

**Exercise to assign:** `src/exercises/05-Session2-State.tsx`

---

### Session 2.2 - useEffect (30 min)

**Start simple:**

```tsx
useEffect(() => {
  console.log('Component mounted')
}, [])  // Empty deps = run once
```

**Then add dependencies:**

```tsx
const [userId, setUserId] = useState(1)

useEffect(() => {
  console.log('Fetching user:', userId)
  // Simulate fetch
}, [userId])  // Re-run when userId changes
```

**Show cleanup:**

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick')
  }, 1000)

  return () => {
    console.log('cleanup')
    clearInterval(interval)
  }
}, [])
```

**Common mistakes to demonstrate:**
- Missing dependencies (React will warn)
- Objects/arrays in deps (infinite loop)
- Forgetting cleanup for subscriptions

**Exercise to assign:** `src/exercises/06-Session2-Effects.tsx`

---

### Session 2.3 - useRef (15 min)

**Two main uses:**

```tsx
import { useRef, useEffect } from 'react'

// Use 1: Access DOM
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input ref={inputRef} />
}

// Use 2: Mutable value (no re-render)
function Timer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('tick')
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

**Key difference from useState:**
- Changing ref.current does NOT trigger re-render
- Use for DOM access and mutable values

**Exercise to assign:** `src/exercises/07-Session2-Refs.tsx`

---

## Tips for Effective Live Coding

### Do's ✅
- **Make intentional mistakes** to show common errors
- **Read error messages out loud** - they're helpful!
- **Use console.log** liberally to show state changes
- **Ask "What do you think will happen?"** before running code
- **Reference backend concepts** ("Props are like function parameters")
- **Take breaks** - don't rush through exercises

### Don'ts ❌
- Don't copy-paste large code blocks
- Don't skip error messages
- Don't assume everyone is following
- Don't use advanced features too early
- Don't move too fast through examples

### Engagement Tactics
- "Who can spot the bug here?"
- "How would you do this in Kotlin/Java?"
- "What do you think the output will be?"
- "Let's break this down step by step"

## Troubleshooting During Sessions

### "My code doesn't work"
1. Check browser console for errors
2. Verify imports are correct
3. Check for TypeScript errors in IntelliJ IDEA
4. Use React DevTools to inspect state

### "I don't see any changes"
- Make sure dev server is running
- Check that file was saved
- Try refreshing browser
- Check if error is shown in terminal

### "TypeScript error I don't understand"
- Read the error carefully (often points to exact issue)
- Check prop types match
- Verify event types are correct
- Use `React.ChangeEvent<HTMLInputElement>` for inputs

## Homework Assignment Template

At the end of each session, assign:

```
Homework for Session [X]:

1. Complete exercises in src/exercises/Session[X]-*.tsx
2. Compare your solution with src/solutions/
3. Build something small using today's concepts:
   [Specific mini-project]
4. Questions? Write them down for next session!

Due: Before next session (optional but recommended)
```

## Session Timing Template

| Time | Activity | Notes |
|------|----------|-------|
| 0-5 min | Review previous session | Quick Q&A |
| 5-10 min | Introduce today's topic | Live demo |
| 10-50 min | Live coding + explanations | Multiple examples |
| 50-70 min | Hands-on exercise time | Help individuals |
| 70-90 min | Review solutions + Q&A | Show different approaches |

## Quick Reference for Common Questions

**Q: When should I use useState vs useRef?**
A: useState when you need re-renders, useRef when you don't.

**Q: Why do I need keys in lists?**
A: React uses them to track which items changed. Without them, bugs can occur.

**Q: When does useEffect run?**
A: After render. Empty deps = once. With deps = when deps change.

**Q: Can I modify props?**
A: No! Props are read-only. Use state if you need to change values.

**Q: Why is my state not updating immediately?**
A: setState is asynchronous. State updates after re-render.

---

Good luck with your training sessions! Remember: The goal is understanding, not memorization. 🚀
