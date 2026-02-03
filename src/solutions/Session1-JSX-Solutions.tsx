/**
 * ✅ SESSION 2.1 - JSX Fundamentals SOLUTIONS
 *
 * 📝 What you'll learn:
 * - JSX syntax and rules
 * - JavaScript expressions in JSX
 * - Common JSX mistakes
 *
 * 🎯 Exercises: 4
 */

// ============================================
// EXERCISE 1 SOLUTION: Fix the JSX errors
// ============================================
// Fixed all JSX syntax errors:
// ✅ Added wrapping element (Fragment <>)
// ✅ Changed 'class' to 'className'
// ✅ Self-closed <img /> tag
// ✅ Changed 'onclick' to 'onClick'

export function BrokenComponent() {
  const userName = 'John Doe'
  const isActive = true

  return (
    <>
      <h1>Welcome, {userName}</h1>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <div className="container">
        <img src="/avatar.jpg" alt="User avatar" />
        <button onClick={() => console.log('clicked')}>Click me</button>
      </div>
    </>
  )
}

// ============================================
// EXERCISE 2 SOLUTION: Create a WelcomeCard component
// ============================================
// - Displays greeting message based on time of day
// - Shows current date
// - Uses conditional rendering for morning/evening

export function WelcomeCard() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 18 ? 'Good morning' : 'Good evening'
  const currentDate = new Date().toLocaleDateString()

  return (
    <div
      style={{
        padding: '1.5rem',
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h2 style={{ color: '#4CAF50', marginTop: 0 }}>{greeting}!</h2>
      <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>
        Welcome to your dashboard
      </p>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Today is {currentDate}
      </p>
    </div>
  )
}

// ============================================
// EXERCISE 3 SOLUTION: Expression vs Statement
// ============================================
// Converted statements to expressions:
// ✅ Used ternary operator for conditional rendering
// ✅ Used .map() for rendering array items

export function ExpressionPractice() {
  const items = ['Apple', 'Banana', 'Orange']
  const showItems = true

  return (
    <div
      style={{
        padding: '1.5rem',
        border: '2px solid #2196F3',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ color: '#2196F3', marginTop: 0 }}>Fruit List</h3>

      {/* Conditional rendering using ternary operator (expression) */}
      {showItems && <p style={{ fontWeight: 'bold' }}>Showing items:</p>}

      {/* Rendering array using .map() (expression) */}
      <ul style={{ listStyleType: 'circle', paddingLeft: '1.5rem' }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// EXERCISE 4 SOLUTION: JSX interpolation practice
// ============================================
// Displays all user information with:
// ✅ Full name (firstName + lastName)
// ✅ Age and email
// ✅ Conditional verified badge
// ✅ Styled with inline styles

export function UserProfile() {
  const user = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 28,
    email: 'jane.smith@example.com',
    isVerified: true,
  }

  return (
    <div
      style={{
        padding: '1.5rem',
        border: '2px solid #9C27B0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        maxWidth: '400px',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ color: '#9C27B0', marginTop: 0, marginBottom: '0.5rem' }}>
          {user.firstName} {user.lastName}
          {user.isVerified && (
            <span
              style={{
                marginLeft: '0.5rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'normal',
              }}
            >
              ✓ Verified
            </span>
          )}
        </h2>
      </div>

      <div style={{ color: '#555', lineHeight: '1.8' }}>
        <p style={{ margin: '0.5rem 0' }}>
          <strong>Age:</strong> {user.age}
        </p>
        <p style={{ margin: '0.5rem 0' }}>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}
