/**
 * Session 2.1 - JSX Fundamentals
 *
 * Exercise: Practice JSX syntax and rules
 */

// EXERCISE 1: Fix the JSX errors
// This component has several JSX syntax errors. Can you fix them?
export function BrokenComponent() {
  const userName = 'John Doe'
  const isActive = true

  // TODO: Fix all the JSX errors below
  return (
    // Error 1: Missing wrapping element
    <h1>Welcome, {userName}</h1>
    <p>Status: {isActive ? 'Active' : 'Inactive'}</p>

    // Error 2: Wrong attribute name
    <div class="container">
      {/* Error 3: Unclosed tag */}
      <img src="/avatar.jpg" alt="User avatar">

      {/* Error 4: Wrong event name */}
      <button onclick={() => console.log('clicked')}>Click me</button>
    </div>
  )
}

// EXERCISE 2: Create a WelcomeCard component
// Requirements:
// - Display a greeting message
// - Show the current date
// - Use conditional rendering to show "Good morning" or "Good evening" based on time
export function WelcomeCard() {
  const currentHour = new Date().getHours()

  // TODO: Implement the component
  return <div>TODO: Implement WelcomeCard</div>
}

// EXERCISE 3: Expression vs Statement
// JSX only accepts expressions, not statements
// Fix this component to use expressions instead
export function ExpressionPractice() {
  const items = ['Apple', 'Banana', 'Orange']
  const showItems = true

  return (
    <div>
      {/* This will fail - you can't use if statements in JSX */}
      {/* TODO: Convert to ternary or && operator */}
      {if (showItems) {
        return <p>Showing items</p>
      }}

      {/* TODO: Convert this for loop to .map() */}
      <ul>
        {for (let i = 0; i < items.length; i++) {
          return <li>{items[i]}</li>
        }}
      </ul>
    </div>
  )
}

// EXERCISE 4: JSX interpolation practice
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

  return <div>TODO: Display user profile</div>
}
