/**
 * ✏️  SESSION 2.1 - JSX Fundamentals
 *
 * 📝 What you'll learn:
 * - JSX syntax and rules
 * - JavaScript expressions in JSX
 * - Common JSX mistakes
 *
 * 🎯 Exercises: 4
 */

// ============================================
// EXERCISE 1: Fix the JSX errors
// ============================================
// This component has several JSX syntax errors that are currently commented out.
// Uncomment the code below and fix the errors!

export function BrokenComponent() {
  const userName = 'John Doe'
  const isActive = true

  // TODO: Uncomment the code below and fix the errors:
  // ❌ Error 1: Missing wrapping element (needs <> or <div>)
  // ❌ Error 2: Using 'class' instead of 'className'
  // ❌ Error 3: Unclosed tag (missing />)
  // ❌ Error 4: Using 'onclick' instead of 'onClick'

  /* UNCOMMENT AND FIX THIS:
  return (
    <h1>Welcome, {userName}</h1>
    <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    <div class="container">
      <img src="/avatar.jpg" alt="User avatar">
      <button onclick={() => console.log('clicked')}>Click me</button>
    </div>
  )
  */

  // Placeholder (delete this when you uncomment above)
  return <div>TODO: Uncomment and fix the JSX errors above</div>
}

// ============================================
// EXERCISE 2: Create a WelcomeCard component
// ============================================
// Requirements:
// - Display a greeting message
// - Show the current date
// - Use conditional rendering to show "Good morning" or "Good evening" based on time

export function WelcomeCard() {
  const currentHour = new Date().getHours()

  // TODO: Implement the component
  // Hint: Use currentHour < 18 ? 'Good morning' : 'Good evening'
  // Hint: Use new Date().toLocaleDateString() for the date

  return <div>TODO: Create welcome card with greeting and date</div>
}

// ============================================
// EXERCISE 3: Expression vs Statement
// ============================================
// JSX only accepts expressions, not statements
// Fix this component to use expressions instead

export function ExpressionPractice() {
  const items = ['Apple', 'Banana', 'Orange']
  const showItems = true

  // TODO: Fix the JSX below to use expressions instead of statements
  // Hint: Replace if statement with ternary (condition ? true : false)
  // Hint: Replace for loop with .map()

  return (
    <div>
      <p>TODO: Add conditional rendering for "Showing items"</p>
      <p>TODO: Render items list using .map()</p>
    </div>
  )
}

// ============================================
// EXERCISE 4: JSX interpolation practice
// ============================================
// Display dynamic content in JSX

export function UserProfile() {
  const user = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 28,
    email: 'jane.smith@example.com',
    isVerified: true,
  }

  // TODO: Display all user information in a nicely formatted card
  // - Show full name (firstName + lastName)
  // - Show age and email
  // - Show a badge if user is verified (use conditional rendering)
  // - Add some inline styles for padding and border

  return <div>TODO: Display user profile with all info</div>
}
