# React Training for Backend Engineers

Welcome to the React Training interactive learning environment! This project is designed to help backend engineers learn React through hands-on exercises and live coding sessions.

## ⚙️ Prerequisites

**Don't have Node.js/npm installed?** → See [SETUP.md](./SETUP.md) for detailed installation instructions.

**Quick check:**
```bash
node --version  # Should be v18+ (v20+ recommended)
npm --version   # Should be v9+
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone git@github.com:bernhardneumayer/react-training.git
cd react-training

# Install dependencies
npm install

# Start the development server with test runner (recommended)
npm run dev:full

# Or start just the dev server
npm run dev

# Run tests (optional - for TDD approach)
npm test
```

The app will be available at http://localhost:5173
- Use `npm run dev:full` to start both the app AND the test runner server
- This allows you to run tests from the UI with a button click!

**Stuck?** Check [SETUP.md](./SETUP.md) for troubleshooting.

## 📚 Project Structure

```
react-training/
├── src/
│   ├── App.tsx                         # Interactive exercise tracker UI with sidebar
│   ├── exercises/                      # Exercise files (numbered for order)
│   │   ├── 01-Session1-JSX.tsx         # Session 1.1: JSX fundamentals
│   │   ├── 02-Session1-Props.tsx       # Session 1.2: Props and TypeScript
│   │   ├── 03-Session1-Lists.tsx       # Session 1.4: Lists and keys
│   │   ├── 04-Session1-Events.tsx      # Session 1.5: Event handling
│   │   ├── 05-Session2-State.tsx       # Session 2.1: useState hook
│   │   ├── 06-Session2-Effects.tsx     # Session 2.2: useEffect hook
│   │   └── 07-Session2-Refs.tsx        # Session 2.3: useRef hook
│   └── solutions/                      # Reference implementations (all 7 sessions)
│       ├── 01-Session1-JSX-Solutions.tsx
│       ├── 02-Session1-Props-Solutions.tsx
│       ├── 03-Session1-Lists-Solutions.tsx
│       ├── 04-Session1-Events-Solutions.tsx
│       ├── 05-Session2-State-Solutions.tsx
│       ├── 06-Session2-Effects-Solutions.tsx
│       └── 07-Session2-Refs-Solutions.tsx
├── SETUP.md                            # Installation guide
├── WORKFLOW.md                         # How to use exercises
├── EXERCISE_TEMPLATE.md                # Template for new exercises
└── README.md
```

💡 **Tip**: Files are numbered `01-`, `02-`, etc. so they appear in the correct order in your editor!

## 📖 Training Sessions

### Session 1: React Basics (Use this environment)
- **1.0** - Quick intro (setup, React mental model)
- **1.1** - JSX Fundamentals
- **1.2** - Props and TypeScript
- **1.3** - Conditional Rendering
- **1.4** - Lists and Keys
- **1.5** - Event Handling
- **1.6** - NXD Preview (switch to Cousteau Storybook)

### Session 2: Hooks (Use this environment)
- **2.1** - useState Hook
- **2.2** - useEffect Hook
- **2.3** - useRef Hook
- **2.4** - Brief mention of useMemo/useCallback

### Session 3-5: Real World Patterns (Switch to Cousteau)
- Custom hooks, API integration, testing, real tickets

## 🎯 How to Use This Repository

### Interactive Exercise Tracker UI

This project features a modern interactive UI for learning React:

**Key Features:**
- **Sidebar Navigation**: Browse all 56 exercises across 7 exercise files
- **Progress Tracking**: Exercises are automatically marked as completed when all tests pass
- **localStorage Persistence**: Your progress is saved between sessions
- **Two Tabs**:
  - **Exercise Tab**: View and edit the current exercise with live preview
  - **Test Results Tab**: Run tests and see results in real-time
- **Test Runners**:
  - **"⚡ This Exercise"** button: Runs only the current exercise's tests (super fast, ~2-3 seconds)
  - **"▶️ All Tests"** button: Runs the entire test suite (slower, ~40 seconds)

**Statistics:**
- 7 exercise files (JSX, Props, Lists, Events, State, Effects, Refs)
- 56 total exercises
- 239 comprehensive tests
- All exercises have solution files in `src/solutions/`

### For Participants (Hands-on Practice)

**📖 Documentation:**
- 🚀 [QUICK_START.md](./QUICK_START.md) - Get started with the interactive UI
- 📖 [WORKFLOW.md](./WORKFLOW.md) - Detailed participant and instructor workflows
- ⚙️  [SETUP.md](./SETUP.md) - Installation & troubleshooting

**Quick workflow:**

1. **Clone and setup**
   ```bash
   git clone git@github.com:bernhardneumayer/react-training.git
   cd react-training
   npm install
   npm run dev:full      # Starts app + test server (required for UI test buttons)
   ```

2. **Use the Interactive UI**
   - Navigate through exercises using the left sidebar
   - Click on any exercise to view it
   - Edit exercise files in `src/exercises/` in your code editor
   - Watch live updates in the browser
   - Click "🧪 Test Results" tab to run tests
   - Use "⚡ This Exercise" for quick feedback on your current work
   - Track your progress automatically as tests pass

3. **Work on exercises**
   - Open exercise files in your code editor (IntelliJ IDEA, VS Code, etc.)
   - Find `TODO` comments and implement the exercises
   - Save files to see live updates in the browser
   - Run tests to verify your implementation
   - Check solutions in `src/solutions/` after attempting yourself

4. **Run tests**
   - **From UI** (recommended): Use the "⚡ This Exercise" or "▶️ All Tests" buttons in the Test Results tab
   - **From command line**: `npm test` (watch mode) or `npm test -- --run` (single run)

### For Instructors (Live Coding)

**📖 See [WORKFLOW.md](./WORKFLOW.md) for detailed instructor workflow**

**Quick approach:**

1. **Use your own coding environment** (e.g., create a separate CodeSandbox or local project)
2. **Live code** while explaining concepts
3. **Reference this repository** for:
   - Exercise ideas and progression
   - Solution implementations
   - Test cases to guide discussions
4. **Participants use the interactive UI** to practice independently

The interactive UI is designed for self-paced learning, while instructors can demonstrate concepts using any preferred setup.

## 🧪 Testing Your Implementation (TDD Approach)

This repository includes comprehensive tests for all exercises to help you verify your implementations. Tests follow the **Test-Driven Development (TDD)** approach.

### How It Works

1. **Tests start failing (Red)** ❌
   - Each exercise has tests that initially fail
   - Tests describe what the exercise should accomplish

2. **Implement to make them pass (Green)** ✅
   - Write code in the exercise files
   - Run tests to see progress
   - Iterate until all tests pass

3. **Verify correctness**
   - Passing tests confirm proper implementation
   - Tests check for best practices (keys, cleanup, etc.)

### Running Tests

**Option 1: Run tests from the UI (Easiest!)**
```bash
# Start both the app and test server
npm run dev:full
```
Then in the browser:
1. Click the "🧪 Test Results" tab
2. Click either:
   - **"⚡ This Exercise"** (green) - Runs only current exercise tests (super fast! ~2-3 seconds)
   - **"▶️ All Tests"** (blue) - Runs entire test suite (slow, ~40 seconds)
3. Watch tests run and results update automatically!

**Option 2: Command line**
```bash
# Watch mode - automatically re-runs tests on file changes
npm test

# Run all tests once
npm test -- --run

# Run specific exercise tests
npm test Lists                    # Tests for Lists exercises
npm test 03-Session1-Lists        # Same thing

# Run with UI (visual test runner)
npm test:ui
```

### Test Output Example

```
✓ Exercise 1: should render a list of transactions
✓ Exercise 1: should display transaction descriptions
× Exercise 1: should use proper keys (not index)
```

### What Tests Verify

- **Lists**: Proper keys, filtering, empty states
- **Events**: Event handlers attached, preventDefault called
- **State**: Immutable updates, derived values
- **Effects**: Cleanup functions, correct dependencies
- **Refs**: DOM manipulation, no unnecessary re-renders

### Test Files

Each exercise file has a corresponding test file:
```
src/exercises/
├── 03-Session1-Lists.tsx       # Exercise implementation
└── 03-Session1-Lists.test.tsx  # Tests for these exercises
```

### Tips for Using Tests

- **Read test descriptions** to understand requirements
- **Run tests frequently** while implementing
- **Don't just make tests pass** - understand why they pass
- **Check multiple exercises** - tests cover edge cases

## 💡 Tips for Learning

### Browser DevTools
- **React DevTools Extension**: Install for Chrome/Firefox
  - Inspect component props and state
  - Track component renders
- **Console**: Check for console.log outputs
- **Network**: Monitor API calls (Session 3 data fetching)

### Common Mistakes to Avoid
```tsx
// ❌ Missing key in lists
{items.map(item => <div>{item.name}</div>)}

// ✅ Always add key
{items.map(item => <div key={item.id}>{item.name}</div>)}

// ❌ Mutating state directly
user.name = 'New Name'
setUser(user)

// ✅ Create new object
setUser({ ...user, name: 'New Name' })

// ❌ Using state before it updates
setCount(count + 1)
console.log(count)  // Still old value!

// ✅ Use functional update or useEffect
setCount(prev => prev + 1)
```

## 🔧 Troubleshooting

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### TypeScript errors
- Make sure you're using TypeScript syntax
- Check that types are imported from 'react'
- Use `React.ChangeEvent<HTMLInputElement>` for event types
- Run `npm run lint` to check for Biome errors

### Component not updating
- Check that you're using `setState`, not mutating directly
- Verify dependency array in useEffect
- Use React DevTools to inspect component state

## 📚 Resources

### Official Documentation
- [React Docs](https://react.dev/learn) - Start here!
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite Guide](https://vite.dev/guide/)

### Practice
- Work through all exercises in order
- Build small projects between sessions
- Read React code in Cousteau to see real-world patterns

### Getting Help
- Ask questions during training sessions
- Check solution files for reference
- Pair with other participants
- Read error messages carefully (they're helpful!)

## 🎓 Next Steps

After completing Sessions 1-2 in this environment:

1. **Switch to Cousteau** for Sessions 3-5
2. **Practice with real components** using NXD design system
3. **Write tests** using React Testing Library
4. **Work on real tickets** to solidify learning

## 📝 Notes for Sessions

### Session 1 Focus
- Understand JSX syntax and rules
- Master props (passing data down)
- Render lists with proper keys
- Handle user interactions with events

### Session 2 Focus
- Manage component state with useState
- Handle side effects with useEffect
- Access DOM elements with useRef
- Understand when to use each hook

Remember: **Don't just copy solutions**. Read the exercises, try to implement them yourself, struggle a bit (that's learning!), and then check solutions to compare approaches.

Happy coding! 🚀
