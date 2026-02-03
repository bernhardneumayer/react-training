# Quick Start - Interactive Exercise Tracker

## Get Started in 3 Commands

```bash
# 1. Clone and install
git clone git@github.com:bernhardneumayer/react-training.git
cd react-training
npm install

# 2. Start the interactive UI with test support
npm run dev:full

# 3. Open browser
# http://localhost:5173
```

That's it! The interactive exercise tracker is now running.

---

## What You'll See

```
┌─────────────────────────────────────────────────────────────┐
│  React Training - Interactive Exercise Tracker             │
├──────────────┬──────────────────────────────────────────────┤
│  [Sidebar]   │  [📝 Exercise]  [🧪 Test Results]           │
│  ──────────  │                                              │
│  JSX (8)     │  Exercise 1: Broken Component                │
│  ├─ Ex 1     │                                              │
│  ├─ Ex 2 ✓   │  Fix the JSX syntax errors...               │
│  ├─ Ex 3     │                                              │
│  └─ ...      │  [Component preview shows here]             │
│              │                                              │
│  Props (8)   │  ──────────────────────────────────────────  │
│  Lists (8)   │  💡 Edit: src/exercises/01-Session1-JSX.tsx │
│  Events (8)  │                                              │
│  State (8)   │                                              │
│  Effects (8) │                                              │
│  Refs (8)    │                                              │
│              │                                              │
│  📊 Progress │                                              │
│  3/56 (5%)   │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

---

## Simple Workflow

### 1. Navigate Exercises
- Click any exercise in the left sidebar
- Browse through 7 topics (JSX, Props, Lists, Events, State, Effects, Refs)
- See your progress: ✓ = completed

### 2. View Exercise Instructions
- Read the requirements in the Exercise tab
- See the live preview of your component
- Note the file path to edit

### 3. Edit in Your Code Editor
```bash
# Open the exercise file shown in the UI
# Example: src/exercises/01-Session1-JSX.tsx

# Find the TODO for the current exercise
# Implement the solution
# Save the file
```

### 4. See Live Updates
- Browser automatically refreshes
- Your changes appear instantly
- No manual imports needed!

### 5. Run Tests
- Click "🧪 Test Results" tab
- Click "⚡ This Exercise" (fast, ~2-3 seconds)
- See which tests pass or fail
- Fix issues and test again

### 6. Track Progress
- Completed exercises show ✓ in sidebar
- Progress saved automatically in browser
- Pick up where you left off anytime

---

## Two Ways to Run Tests

### ⚡ This Exercise (Green Button)
```
Fast feedback on current exercise
~2-3 seconds
Perfect for active development
```

**When to use:**
- While working on an exercise
- Quick verification
- Frequent testing (TDD approach)

### ▶️ All Tests (Blue Button)
```
Full test suite
~40 seconds
All 239 tests across 56 exercises
```

**When to use:**
- Before taking a break
- After completing a session
- Final verification

---

## Quick Commands

```bash
# Start with test support (RECOMMENDED)
npm run dev:full

# Start without test UI buttons (not recommended)
npm run dev

# Run tests in terminal (watch mode)
npm test

# Run all tests once
npm test -- --run

# Run specific exercise tests
npm test JSX
npm test Props
npm test State
```

---

## Tips for Fast Learning

### Use Split Screen
```
┌─────────────────┬──────────────────┐
│  Browser        │  Code Editor     │
│  (Instructions  │  (Implementation)│
│   & Tests)      │                  │
└─────────────────┴──────────────────┘
```

### Follow the TDD Cycle
```
1. Read exercise → understand requirements
2. Run tests → see what's expected (red)
3. Implement → write code in editor
4. Save & test → click "⚡ This Exercise"
5. Fix → iterate until green
6. Move on → next exercise!
```

### Trust the Progress Tracker
- ✓ checkmark = all tests pass
- No checkmark = needs work
- Focus on exercises without ✓

### Use Solutions When Stuck
- Solutions in `src/solutions/`
- Compare your approach
- Learn alternative techniques

---

## Navigation Shortcuts

### Finding Exercises
```
All exercises are in: src/exercises/

01-Session1-JSX.tsx       → 8 exercises
02-Session1-Props.tsx     → 8 exercises
03-Session1-Lists.tsx     → 8 exercises
04-Session1-Events.tsx    → 8 exercises
05-Session2-State.tsx     → 8 exercises
06-Session2-Effects.tsx   → 8 exercises
07-Session2-Refs.tsx      → 8 exercises
```

### Finding Solutions
```
All solutions are in: src/solutions/

01-Session1-JSX-Solutions.tsx
02-Session1-Props-Solutions.tsx
03-Session1-Lists-Solutions.tsx
04-Session1-Events-Solutions.tsx
05-Session2-State-Solutions.tsx
06-Session2-Effects-Solutions.tsx
07-Session2-Refs-Solutions.tsx
```

---

## Common Questions

**Q: Why use `npm run dev:full` instead of `npm run dev`?**
- `dev:full` starts both the app AND test server
- Required for "⚡ This Exercise" and "▶️ All Tests" buttons to work
- Only takes a few seconds longer to start

**Q: How do I know which file to edit?**
- Look at the bottom of the Exercise tab
- Shows the file path (e.g., `src/exercises/01-Session1-JSX.tsx`)
- Each exercise has a TODO comment with the exercise number

**Q: Can I skip around?**
- Yes! Click any exercise in the sidebar
- Recommended order is top-to-bottom
- But feel free to explore

**Q: Where is my progress saved?**
- In your browser's localStorage
- Persists across browser sessions
- Per-browser (doesn't sync across devices)

**Q: How do I reset progress?**
```javascript
// In browser console (F12)
localStorage.clear()
// Then refresh page
```

**Q: What if tests fail?**
- Read the error message carefully
- Check the test requirements
- Compare with solution file
- Ask for help if stuck!

---

## Example: Your First Exercise

**Step by step:**

1. **Start the app**
   ```bash
   npm run dev:full
   ```

2. **Click "JSX Exercise 1" in sidebar**

3. **Read the exercise instructions**
   ```
   Exercise 1: Broken Component
   Fix the JSX syntax errors in this component
   ```

4. **Open the file in your editor**
   ```bash
   # File: src/exercises/01-Session1-JSX.tsx
   ```

5. **Find Exercise 1 TODO**
   ```tsx
   export function BrokenComponent() {
     // TODO: Exercise 1 - Fix JSX syntax errors
     // Find and fix all the syntax errors

     return (
       <div>
         <h1>Welcome</h1>
         // Your code here
       </div>
     )
   }
   ```

6. **Fix the code and save**
   ```tsx
   export function BrokenComponent() {
     return (
       <div>
         <h1>Welcome</h1>
         <p>Fixed!</p>
       </div>
     )
   }
   ```

7. **See it update in browser**

8. **Run tests**
   - Click "🧪 Test Results" tab
   - Click "⚡ This Exercise"
   - Wait ~2 seconds
   - See results!

9. **Exercise complete!**
   - All tests pass? → ✓ appears in sidebar
   - Some tests fail? → Fix and test again

10. **Move to next exercise**
    - Click "JSX Exercise 2" in sidebar
    - Repeat!

---

## Troubleshooting

**Browser shows blank page**
- Check terminal for errors
- Make sure `npm run dev:full` completed successfully
- Try `npm install` again

**Test buttons don't work**
- Did you use `npm run dev:full`?
- Check that both servers started (look for two URLs in terminal)
- Try stopping and restarting

**Changes not showing**
- Save the file in your editor
- Wait 1-2 seconds for hot reload
- Check browser console for errors

**Can't find exercise**
- Use sidebar navigation (left side)
- Files are in `src/exercises/`
- Named `01-`, `02-`, etc.

**Progress not saving**
- Check localStorage is enabled
- Not in private/incognito mode?
- Try running tests to trigger save

---

## What's Next?

**Recommended Learning Path:**

1. **Start with JSX** (8 exercises)
   - Learn JSX syntax rules
   - Practice expressions and fragments
   - Build simple components

2. **Move to Props** (8 exercises)
   - Pass data to components
   - Use TypeScript types
   - Create reusable components

3. **Practice Lists** (8 exercises)
   - Render arrays
   - Use keys properly
   - Filter and sort data

4. **Handle Events** (8 exercises)
   - onClick handlers
   - Form inputs
   - Prevent default behavior

5. **Add State** (8 exercises)
   - useState hook
   - Update state immutably
   - Manage complex state

6. **Use Effects** (8 exercises)
   - useEffect hook
   - Side effects
   - Cleanup functions

7. **Master Refs** (8 exercises)
   - useRef hook
   - DOM manipulation
   - Persistent values

**Total: 56 exercises, 239 tests**

---

## Quick Reference Card

| Action | How |
|--------|-----|
| Start app | `npm run dev:full` |
| Navigate | Click in sidebar |
| View exercise | Automatically shown |
| Edit code | Open `src/exercises/*.tsx` |
| See changes | Save file (auto-reload) |
| Run tests | Test Results → "⚡ This Exercise" |
| Check solution | Open `src/solutions/*.tsx` |
| Reset progress | Browser console: `localStorage.clear()` |

---

## Additional Resources

**Documentation:**
- [WORKFLOW.md](./WORKFLOW.md) - Detailed workflows for participants and instructors
- [SETUP.md](./SETUP.md) - Installation help and troubleshooting
- [README.md](./README.md) - Full project overview

**External Resources:**
- [React Docs](https://react.dev) - Official React documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - TypeScript reference

---

## Summary

```
1. npm run dev:full
2. Click exercise in sidebar
3. Edit file in code editor
4. Save and see changes
5. Run tests via UI
6. Repeat!
```

**56 exercises, 239 tests, 1 interactive UI. Start learning React today!**

Happy coding! 🚀
