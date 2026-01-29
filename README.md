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

# Start the development server
npm run dev
```

The app will be available at http://localhost:5173

**Stuck?** Check [SETUP.md](./SETUP.md) for troubleshooting.

## 📚 Project Structure

```
react-training/
├── src/
│   ├── App.tsx                         # Live coding area with current session
│   ├── exercises/                      # Exercise files (numbered for order)
│   │   ├── 01-Session1-JSX.tsx         # Session 1.1: JSX fundamentals
│   │   ├── 02-Session1-Props.tsx       # Session 1.2: Props and TypeScript
│   │   ├── 03-Session1-Lists.tsx       # Session 1.4: Lists and keys
│   │   ├── 04-Session1-Events.tsx      # Session 1.5: Event handling
│   │   ├── 05-Session2-State.tsx       # Session 2.1: useState hook
│   │   ├── 06-Session2-Effects.tsx     # Session 2.2: useEffect hook
│   │   └── 07-Session2-Refs.tsx        # Session 2.3: useRef hook
│   └── solutions/                      # Reference implementations
│       ├── Session1-Props-Solutions.tsx
│       └── Session2-State-Solutions.tsx
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

### For Instructors (Live Coding)

1. **Before Session 1**: Open `src/App.tsx` in IntelliJ IDEA
2. **During Session**: Type code directly in App.tsx while screen sharing
3. **Show Examples**: Import and render exercise components from `src/exercises/`
4. **Reference Solutions**: Check `src/solutions/` for correct implementations

Example live coding setup:
```tsx
// src/App.tsx
import { Counter } from './exercises/05-Session2-State'
import { UserCard } from './solutions/Session1-Props-Solutions'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Session 2.1 - useState</h1>

      {/* Live code here */}
      <Counter />

      {/* Or show solution */}
      <UserCard />
    </div>
  )
}
```

### For Participants (Hands-on Practice)

**📖 Documentation:**
- 🚀 [QUICK_START.md](./QUICK_START.md) - Fast session switching reference
- 📖 [WORKFLOW.md](./WORKFLOW.md) - Detailed step-by-step workflow
- ⚙️  [SETUP.md](./SETUP.md) - Installation & troubleshooting

**Quick workflow:**

1. **Clone and setup**
   ```bash
   git clone git@github.com:bernhardneumayer/react-training.git
   cd react-training
   npm install
   npm run dev
   ```

2. **Work on exercises** (Recommended approach)
   - Edit exercise files in `src/exercises/` (numbered `01-`, `02-`, etc.)
   - Find `TODO` comments and implement
   - Each component has a placeholder UI showing status (🚧 Not started, ✏️ In progress, ✅ Complete)
   - Import into `App.tsx` to test:
     ```tsx
     import { Counter } from './exercises/05-Session2-State'

     function App() {
       return <Counter />  // See your work in browser!
     }
     ```

3. **Check solutions**
   - Compare with `src/solutions/` after trying yourself
   - Understand different approaches

4. **Experiment freely**
   - `App.tsx` is your playground
   - Hot reload updates instantly
   - Use browser DevTools for debugging

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
