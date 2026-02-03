# Workflow Guide - Using the Interactive Exercise Tracker

## Overview

This React Training environment features an **interactive exercise tracker UI** that makes learning React intuitive and engaging. No more manual imports or configuration—just click, code, and test!

**Two Ways to Use This Repository:**

1. **For Participants**: Use the interactive sidebar UI to navigate exercises and track progress
2. **For Instructors**: Use your own live coding environment for demonstrations

---

## For Participants - Interactive UI Workflow

### Getting Started

**Start the application:**
```bash
npm run dev:full
```

This command starts:
- Development server at http://localhost:5173
- Test runner server for the UI test buttons

**What you'll see:**
```
┌─────────────────────────────────────────────────────────┐
│  [Sidebar]         [Exercise Tab]   [Test Results Tab]  │
│  ┌──────────┐     ┌──────────────────────────────────┐  │
│  │ JSX (8)  │     │                                  │  │
│  │ - Ex 1   │     │  Exercise content shows here     │  │
│  │ - Ex 2 ✓ │     │  with live preview               │  │
│  │          │     │                                  │  │
│  │ Props(8) │     └──────────────────────────────────┘  │
│  │          │                                          │
│  │ Lists(8) │     [Switch to Test Results Tab →]      │
│  │          │                                          │
│  │ ...      │                                          │
│  └──────────┘                                          │
└─────────────────────────────────────────────────────────┘
```

---

### Step-by-Step Workflow

#### 1. Navigate Exercises Using Sidebar

**The sidebar shows:**
- All 7 exercise files organized by topic
- Exercise numbers and names
- Progress indicators (✓ for completed exercises)
- Total count per file (e.g., "JSX (8)" means 8 exercises)

**Click any exercise** to view it in the main panel.

**Example:**
```
Sidebar:
├── JSX (8)
│   ├── Exercise 1: Broken Component
│   ├── Exercise 2: Welcome Card ✓
│   ├── Exercise 3: Expression Practice
│   └── ...
├── Props (8)
│   ├── Exercise 1: Button Component
│   └── ...
└── ...
```

---

#### 2. View Exercise in the Exercise Tab

**What you see:**
- Exercise instructions and requirements
- Current implementation (placeholder or your work)
- Live preview of the component

**What to do:**
1. Read the exercise instructions in the browser
2. Open the corresponding file in your code editor:
   - Example: For "JSX Exercise 1", open `src/exercises/01-Session1-JSX.tsx`
3. Find the `TODO` comment for that exercise
4. Implement the exercise in your editor
5. Save the file
6. Watch the browser auto-update with your changes

---

#### 3. Edit Exercise Files in Your Code Editor

**Open the exercise file:**
```bash
# In IntelliJ IDEA or VS Code
# Navigate to src/exercises/01-Session1-JSX.tsx
```

**Find and implement the TODO:**
```tsx
// Example from 01-Session1-JSX.tsx
export function WelcomeCard() {
  // TODO: Exercise 2 - Create a welcome card component
  // Requirements:
  // - Show a welcome message with your name
  // - Include a styled container
  // - Add a greeting based on time of day

  // Your implementation here:
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : 'Good afternoon'

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>{greeting}, Learner!</h2>
      <p>Welcome to React Training</p>
    </div>
  )
}
```

**Save the file** → Browser updates automatically!

---

#### 4. Run Tests in the Test Results Tab

**Switch to Test Results tab:**
- Click "🧪 Test Results" at the top of the main panel

**Two test buttons:**

**⚡ This Exercise (Green Button)**
- Runs tests ONLY for the currently selected exercise
- Super fast: ~2-3 seconds
- Perfect for quick feedback while working
- Shows focused results for just what you're coding

**▶️ All Tests (Blue Button)**
- Runs the entire test suite (all 239 tests)
- Slower: ~40 seconds
- Use when you want to verify everything still works
- Shows comprehensive results across all exercises

**Example test output:**
```
Running tests for: Exercise 2 - Welcome Card

✓ should render a welcome message
✓ should include user name
× should show time-based greeting

2 passed, 1 failed
```

---

#### 5. Track Your Progress

**Automatic progress tracking:**
- When ALL tests for an exercise pass, it's marked complete
- Completed exercises show a ✓ checkmark in the sidebar
- Progress is saved in localStorage (persists across browser sessions)

**Progress indicators:**
```
Sidebar Progress:
├── JSX (8)          3/8 complete
│   ├── Exercise 1 ✓
│   ├── Exercise 2 ✓
│   ├── Exercise 3 ✓
│   ├── Exercise 4 (← currently working)
│   └── ...
```

**View overall stats:**
- Total exercises completed
- Percentage complete
- Exercises remaining

---

### Recommended Daily Workflow

**Start of each session:**

1. **Start the app**
   ```bash
   npm run dev:full
   ```

2. **Open browser** to http://localhost:5173

3. **Pick up where you left off**
   - Sidebar shows your progress
   - Click on next incomplete exercise

4. **Work through exercises:**
   - Select exercise in sidebar
   - Read requirements in Exercise tab
   - Open file in code editor
   - Implement the exercise
   - Save file → see live updates
   - Switch to Test Results tab
   - Click "⚡ This Exercise"
   - Fix any failing tests
   - Repeat!

5. **Check solutions when stuck**
   - Open corresponding solution file in `src/solutions/`
   - Compare approaches
   - Learn different techniques

---

### Tips for Using the Interactive UI

**Tip 1: Use Split Screen**
```
┌────────────────────┬─────────────────────┐
│  Browser           │  Code Editor        │
│  (Exercise Tracker)│  (Implementation)   │
│                    │                     │
│  See instructions  │  Write code here    │
│  & run tests here  │                     │
└────────────────────┴─────────────────────┘
```

**Tip 2: Test Early and Often**
- Use "⚡ This Exercise" frequently while coding
- Quick feedback helps you catch mistakes early
- Red → Green → Refactor (TDD approach)

**Tip 3: Trust the Progress Tracking**
- Green checkmark = all tests pass
- No checkmark = work needed
- Focus on exercises without checkmarks

**Tip 4: Use "▶️ All Tests" Periodically**
- Before taking a break
- After completing a session
- To ensure you didn't break anything

**Tip 5: Progress is Saved**
- Your progress persists across sessions
- Close browser, come back later
- Progress is still there!

---

## For Instructors - Live Coding Approach

The interactive UI is designed primarily for **participant self-paced learning**. For live coding sessions, we recommend a different approach.

### Recommended: Separate Live Coding Environment

**Why separate from the UI?**
- The App.tsx is now an exercise tracker, not a blank canvas
- Live coding works best with a clean, simple setup
- Participants use the UI for practice, you use your environment for teaching

**Best Options:**

**Option 1: CodeSandbox (Recommended)**
```
1. Create new React + TypeScript sandbox
2. Share link with participants
3. Live code in the sandbox while screen sharing
4. Participants follow along or take notes
5. After demo, participants practice in the exercise tracker UI
```

**Option 2: Local Project**
```bash
# Create a separate clean project for live coding
npm create vite@latest react-demo -- --template react-ts
cd react-demo
npm install
npm run dev

# Screen share this simple app
# Participants watch and learn
# Then practice in the exercise tracker UI
```

**Option 3: IntelliJ IDEA Scratch Files**
```
1. Create a new scratch file (Cmd+Shift+N on Mac)
2. Choose TypeScript React file type
3. Write code examples
4. Use IntelliJ's built-in preview (if available)
5. Or copy to a minimal Vite project
```

---

### Live Coding Session Structure

**Before the session:**
1. Prepare your live coding environment (CodeSandbox, local project, etc.)
2. Share the link or project with participants
3. Ensure participants have the exercise tracker running (`npm run dev:full`)

**During the session:**

**Part 1: Live Demonstration (30-40 minutes)**
```tsx
// Your live coding environment
// Example: Teaching useState

import { useState } from 'react'

function App() {
  // Start simple
  return <button>Click me</button>

  // Add console.log
  // return (
  //   <button onClick={() => console.log('clicked')}>
  //     Click me
  //   </button>
  // )

  // Add state
  // const [count, setCount] = useState(0)
  // return (
  //   <button onClick={() => setCount(count + 1)}>
  //     Count: {count}
  //   </button>
  // )
}
```

**Part 2: Guided Practice (20-30 minutes)**
```
1. Participants switch to exercise tracker UI
2. Navigate to relevant exercises (e.g., "State Exercise 1")
3. Work on exercises while you're available for questions
4. Use "⚡ This Exercise" to test their work
5. Discuss common mistakes or approaches
```

**Part 3: Independent Practice (remaining time)**
```
1. Participants continue with more exercises
2. Use Test Results to verify implementations
3. Check solutions when stuck
4. Ask questions as needed
```

---

### Demonstrating Exercise Solutions

**If you want to show solutions from the exercise tracker:**

1. **Reference solution files** in `src/solutions/`:
   ```
   src/solutions/
   ├── 01-Session1-JSX-Solutions.tsx
   ├── 02-Session1-Props-Solutions.tsx
   ├── 03-Session1-Lists-Solutions.tsx
   └── ...
   ```

2. **Open solution file** in your code editor and explain the implementation

3. **Or copy to your live coding environment** to demonstrate

**Example:**
```tsx
// Copy from 05-Session2-State-Solutions.tsx to your CodeSandbox
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

---

### Using This Repo as Reference

**This repository provides:**
- Exercise progression and structure
- 56 well-designed exercises covering React fundamentals
- 239 test cases covering best practices
- Complete solution implementations
- Clear learning path from JSX to Hooks

**As an instructor, use it for:**
- Planning session content and flow
- Reference implementations for demonstrations
- Test cases to guide discussions about best practices
- Exercise ideas for participants to practice
- Self-paced learning resource for participants

---

## Alternative: Instructor Uses UI for Demonstrations

If you prefer to use the exercise tracker UI for demonstrations:

**Approach 1: Show Solutions**
1. Navigate to exercises in the UI
2. Open solution files in editor
3. Walk through the solution code
4. Explain key concepts and decisions

**Approach 2: Show Exercise + Test Flow**
1. Select an exercise in the UI
2. Show the Exercise tab (what needs to be built)
3. Switch to Test Results tab
4. Run "⚡ This Exercise" to show failing tests
5. Open exercise file in editor
6. Implement solution while explaining
7. Save file → watch browser update
8. Run tests again → show passing tests
9. Explain how TDD workflow helps learning

**Downside:**
- Navigating the UI can be slower than clean live coding
- More clicks and tab switching
- Less focus on pure coding, more on tool navigation

---

## Common Workflow Questions

### "How do I reset my progress?"

**In the browser:**
- Open browser DevTools (F12)
- Go to Application tab → Local Storage
- Find the progress key and delete it
- Refresh the page

**Or clear all localStorage:**
```javascript
// In browser console
localStorage.clear()
```

---

### "Can I work on exercises out of order?"

**Yes!**
- Click any exercise in the sidebar
- No need to complete them sequentially
- However, recommended order follows logical progression

---

### "What if tests pass but I don't think my solution is good?"

**That's great critical thinking!**
- Tests verify basic requirements
- Your solution might work but could be improved
- Check solution files for alternative approaches
- Discuss with instructor or peers
- Refactor while tests are green (safe to experiment)

---

### "How do I see all my completed exercises?"

**Sidebar shows completion status:**
- ✓ checkmark = completed
- No checkmark = not completed or tests failing
- Scroll through sidebar to see all progress

**Or use "▶️ All Tests":**
- Shows comprehensive results
- See which exercises have passing tests

---

### "Can multiple people share progress?"

**No, progress is per-browser:**
- localStorage is browser-specific
- Each participant has their own progress
- Progress doesn't sync across devices/browsers

---

## Troubleshooting

### "Test buttons don't work"

**Solution:**
```bash
# Make sure you started with dev:full
npm run dev:full

# Not just:
# npm run dev
```

The test buttons require the test server to be running.

---

### "Progress isn't saving"

**Check:**
1. Is localStorage enabled in your browser?
2. Are you in private/incognito mode? (localStorage may not persist)
3. Try running tests again to trigger progress update

---

### "Exercise not updating in browser"

**Try:**
1. Save the file in your editor
2. Wait 1-2 seconds for hot reload
3. Check browser console for errors
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

### "I accidentally edited the wrong file"

**No problem:**
```bash
# Revert changes with git
git checkout src/exercises/01-Session1-JSX.tsx

# Or restore from solutions as reference
# (copy the exercise structure, not the solution)
```

---

## Quick Reference

| Task | How To |
|------|--------|
| Start app | `npm run dev:full` |
| Navigate exercises | Click in left sidebar |
| View exercise | Exercise Tab (default view) |
| Run tests | Test Results Tab → "⚡ This Exercise" or "▶️ All Tests" |
| Edit exercise | Open `src/exercises/*.tsx` in code editor |
| Check solution | Open `src/solutions/*.tsx` (read-only) |
| See progress | Look for ✓ in sidebar |
| Reset progress | Clear localStorage in DevTools |

---

## Summary

**For Participants:**
✅ Use the interactive sidebar UI
✅ Navigate exercises with one click
✅ Edit files in your code editor
✅ Run tests from the UI
✅ Track progress automatically

**For Instructors:**
✅ Use separate live coding environment (CodeSandbox, local project)
✅ Demonstrate concepts with clean, simple examples
✅ Reference this repo for exercise ideas and solutions
✅ Let participants use the UI for independent practice
✅ Focus on teaching, not tool navigation

**The Result:**
- Participants get a smooth, guided learning experience
- Instructors can focus on teaching and demonstrating
- Clear separation between learning (UI) and teaching (live coding)
- Everyone benefits from structured exercises and comprehensive tests

Happy coding! 🚀
