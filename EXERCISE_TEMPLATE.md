# Exercise File Template

This template shows how all exercise files are structured with **simple placeholders**.

## File Structure

```tsx
/**
 * ✏️  SESSION X.Y - Topic Name
 *
 * 📝 What you'll learn:
 * - Concept 1
 * - Concept 2
 * - Concept 3
 *
 * 🎯 Exercises: N
 */

// ============================================
// EXERCISE 1: Exercise Title
// ============================================
// Brief description of what to do

export function Exercise1() {
  // TODO: Clear instructions
  // Hint: Helpful hints if needed

  return <div>TODO: Brief task description</div>
}

// ============================================
// EXERCISE 2: Another Exercise
// ============================================

export function Exercise2() {
  // TODO: Instructions
  // Hint: Another helpful hint

  return <div>TODO: Implement Exercise2</div>
}
```

## Key Points

### ✅ DO
- Always export working components (even if placeholders)
- Show clear status indicators (🚧 Not started, ✏️ In progress, ✅ Complete)
- Use dashed borders for "not implemented" state
- Include helpful hints in comments
- Add visual section separators

### ❌ DON'T
- Don't leave syntax errors uncommented
- Don't use `throw new Error()` in components
- Don't export broken code
- Don't make imports fail

## Working Through Exercises

Simply implement the exercise step by step:

```tsx
// Start with the placeholder
export function Counter() {
  // TODO: Add state for count
  return <div>TODO: Implement Counter</div>
}

// Implement the solution
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}
```

## Handling Broken Code

For exercises where you need to fix errors, use block comments:

```tsx
export function FixErrors() {
  // TODO: Uncomment and fix the code below

  /* UNCOMMENT AND FIX:
  return (
    <h1>This has errors</h1>
    <p>Missing wrapper!</p>
  )
  */

  // Placeholder (remove when uncommenting above)
  return <div>TODO: Fix the errors</div>
}
```

## Using Exercises

Exercises are automatically loaded by the interactive UI. Simply work on the exercise file directly - the application will detect and display your changes in real-time.

## Benefits

1. **No import errors** - All exports are valid
2. **Clear TODOs** - Comments make next steps obvious
3. **Easy navigation** - Simple structure to follow
4. **Instructor friendly** - Can showcase all exercises
5. **Git friendly** - Can commit partial progress

---

This pattern ensures exercises are always importable and progress is visible! 🚀
