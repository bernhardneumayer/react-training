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
│   ├── App.tsx                    # Main live coding area (reset each session)
│   ├── exercises/                 # Exercise files with TODOs
│   │   ├── Session2-JSX.tsx       # JSX fundamentals
│   │   ├── Session2-Props.tsx     # Props and TypeScript
│   │   ├── Session2-Lists.tsx     # Lists and keys
│   │   ├── Session2-Events.tsx    # Event handling
│   │   ├── Session3-State.tsx     # useState hook
│   │   ├── Session3-Effects.tsx   # useEffect hook
│   │   └── Session3-Refs.tsx      # useRef hook
│   └── solutions/                 # Reference implementations
│       ├── Session2-Props-Solutions.tsx
│       └── Session3-State-Solutions.tsx
├── package.json
└── README.md
```

## 📖 Training Sessions

### Session 2: React Basics (Use this environment)
- **2.1** - JSX Fundamentals
- **2.2** - Props and TypeScript
- **2.3** - Conditional Rendering
- **2.4** - Lists and Keys
- **2.5** - Event Handling
- **2.6** - NXD Preview (switch to Cousteau Storybook)

### Session 3: Hooks (Use this environment)
- **3.1** - useState Hook
- **3.2** - useEffect Hook
- **3.3** - useRef Hook
- **3.4** - Brief mention of useMemo/useCallback

### Session 4-6: Real World Patterns (Switch to Cousteau)
- Custom hooks, API integration, testing, real tickets

## 🎯 How to Use This Repository

### For Instructors (Live Coding)

1. **Before Session 2**: Open `src/App.tsx` in VS Code
2. **During Session**: Type code directly in App.tsx while screen sharing
3. **Show Examples**: Import and render exercise components from `src/exercises/`
4. **Reference Solutions**: Check `src/solutions/` for correct implementations

Example live coding setup:
```tsx
// src/App.tsx
import { Counter } from './exercises/Session3-State'
import { UserCard } from './solutions/Session2-Props-Solutions'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Session 3.1 - useState</h1>

      {/* Live code here */}
      <Counter />

      {/* Or show solution */}
      <UserCard />
    </div>
  )
}
```

### For Participants (Hands-on Practice)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-training
   npm install
   npm run dev
   ```

2. **Work on exercises**
   - Open exercise files in `src/exercises/`
   - Look for `TODO` comments
   - Implement the missing functionality
   - Import and render in `App.tsx` to test

3. **Check solutions**
   - Compare your implementation with `src/solutions/`
   - Understand different approaches

4. **Experiment freely**
   - Modify `App.tsx` as much as you want
   - Hot reload will update instantly
   - Console in DevTools for debugging

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

After completing Sessions 2-3 in this environment:

1. **Switch to Cousteau** for Sessions 4-6
2. **Practice with real components** using NXD design system
3. **Write tests** using React Testing Library
4. **Work on real tickets** to solidify learning

## 📝 Notes for Sessions

### Session 2 Focus
- Understand JSX syntax and rules
- Master props (passing data down)
- Render lists with proper keys
- Handle user interactions with events

### Session 3 Focus
- Manage component state with useState
- Handle side effects with useEffect
- Access DOM elements with useRef
- Understand when to use each hook

Remember: **Don't just copy solutions**. Read the exercises, try to implement them yourself, struggle a bit (that's learning!), and then check solutions to compare approaches.

Happy coding! 🚀
