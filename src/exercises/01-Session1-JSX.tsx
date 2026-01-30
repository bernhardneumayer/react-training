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

  // TODO: Fix the JSX errors below:
  // ❌ Error 1: Missing wrapping element (needs <> or <div>)
  // ❌ Error 2: Using 'class' instead of 'className'
  // ❌ Error 3: Unclosed tag (missing />)
  // ❌ Error 4: Using 'onclick' instead of 'onClick'

  // BROKEN CODE - Fix these errors:
  return (
    <>
      <div style={{ padding: '1rem', border: '2px dashed red', borderRadius: '8px' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>🚧 This component has JSX errors!</p>
        <p>Check the code and fix the 4 errors listed above.</p>
        <p>Hint: The errors are in the commented code. Replace this placeholder with the fixed code.</p>
      </div>
      {/*
      Broken code to fix (currently commented to prevent errors):
      <h1>Welcome, {userName}</h1>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <div class="container">
        <img src="/avatar.jpg" alt="User avatar">
        <button onclick={() => console.log('clicked')}>Click me</button>
      </div>
      */}
    </>
  )
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

  return (
    <div style={{ padding: '1rem', border: '2px dashed orange', borderRadius: '8px' }}>
      <p style={{ color: 'orange', fontWeight: 'bold' }}>🚧 TODO: Create welcome card</p>
      <p>Display a greeting based on time of day (currentHour variable)</p>
      <p>Show the current date using new Date().toLocaleDateString()</p>
    </div>
  )
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
    <div style={{ padding: '1rem', border: '2px dashed orange', borderRadius: '8px' }}>
      <p style={{ color: 'orange', fontWeight: 'bold' }}>🚧 TODO: Use expressions in JSX</p>
      <p>1. Add conditional rendering: show "Showing items" only if showItems is true</p>
      <p>2. Render the items array using .map() method</p>
      <p>Hint: JSX only accepts expressions, not statements (no if/for loops directly in JSX)</p>
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

  return (
    <div style={{ padding: '1rem', border: '2px dashed orange', borderRadius: '8px' }}>
      <p style={{ color: 'orange', fontWeight: 'bold' }}>🚧 TODO: Display user profile</p>
      <p>Display the user object information:</p>
      <ul>
        <li>Full name (combine firstName + lastName)</li>
        <li>Age and email</li>
        <li>✓ Badge if user.isVerified is true</li>
      </ul>
    </div>
  )
}
