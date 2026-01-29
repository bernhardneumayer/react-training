/**
 * Session 2.5 - Event Handling
 *
 * Exercise: Handle user interactions
 */

// EXERCISE 1: Basic click handler
export function ClickCounter() {
  // TODO: Add state to track click count (you'll need useState from Session 3)
  // For now, just console.log on click

  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div>
      <h2>Click Counter</h2>
      <button onClick={handleClick}>Click me</button>
      <p>Check the console</p>
    </div>
  )
}

// EXERCISE 2: Input change handler
export function ControlledInput() {
  // TODO: Track input value with state
  // For now, just log the value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', event.target.value)
  }

  return (
    <div>
      <h2>Controlled Input</h2>
      <input
        type="text"
        placeholder="Type something..."
        onChange={handleChange}
      />
      <p>Check the console as you type</p>
    </div>
  )
}

// EXERCISE 3: Form submission
export function LoginForm() {
  // TODO: Handle form submission
  // Prevent default behavior
  // Log email and password

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Prevent page reload
    // TODO: Get form data and log it
    console.log('Form submitted')
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder="Email" required />
        </div>
        <div>
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

// EXERCISE 4: Multiple event types
export function MultiEventComponent() {
  const handleClick = () => {
    console.log('Clicked')
  }

  const handleDoubleClick = () => {
    console.log('Double clicked')
  }

  const handleMouseEnter = () => {
    console.log('Mouse entered')
  }

  const handleMouseLeave = () => {
    console.log('Mouse left')
  }

  return (
    <div>
      <h2>Multiple Events</h2>
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: '20px',
          border: '2px solid #ccc',
          cursor: 'pointer',
        }}
      >
        Interact with me! Check the console.
      </div>
    </div>
  )
}

// EXERCISE 5: Passing data with events
// Common pattern: How to pass additional data to event handlers
interface Item {
  id: string
  name: string
}

const items: Item[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
]

export function ItemList() {
  // ❌ BAD: Creates new function on every render (performance issue)
  const handleBadClick = (id: string) => {
    console.log('Clicked item:', id)
  }

  // ✅ GOOD: Curry the function
  const handleGoodClick = (id: string) => () => {
    console.log('Clicked item:', id)
  }

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            {/* ❌ This creates a new function every render */}
            <button onClick={() => handleBadClick(item.id)}>Bad</button>

            {/* ✅ This is better - function is created once per item */}
            <button onClick={handleGoodClick(item.id)}>Good</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// EXERCISE 6: Keyboard events
export function KeyboardHandler() {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key pressed:', event.key)

    // TODO: Add special handling for Enter key
    if (event.key === 'Enter') {
      console.log('Enter key pressed!')
    }

    // TODO: Add special handling for Escape key
    if (event.key === 'Escape') {
      console.log('Escape key pressed!')
    }
  }

  return (
    <div>
      <h2>Keyboard Events</h2>
      <input
        type="text"
        placeholder="Press Enter or Escape"
        onKeyDown={handleKeyDown}
      />
      <p>Check the console</p>
    </div>
  )
}

// EXERCISE 7: Event bubbling and stopPropagation
export function EventBubbling() {
  const handleParentClick = () => {
    console.log('Parent clicked')
  }

  const handleChildClick = (event: React.MouseEvent) => {
    console.log('Child clicked')
    // TODO: Uncomment this to stop event from bubbling to parent
    // event.stopPropagation()
  }

  return (
    <div>
      <h2>Event Bubbling</h2>
      <div
        onClick={handleParentClick}
        style={{ padding: '20px', border: '2px solid blue' }}
      >
        Parent (blue border)
        <div
          onClick={handleChildClick}
          style={{
            padding: '20px',
            border: '2px solid red',
            marginTop: '10px',
          }}
        >
          Child (red border) - Click me and check console
        </div>
      </div>
      <p>
        Notice: Clicking child triggers both handlers. Uncomment
        stopPropagation to prevent this.
      </p>
    </div>
  )
}

// EXERCISE 8: Focus and blur events
export function FocusEvents() {
  const handleFocus = () => {
    console.log('Input focused')
  }

  const handleBlur = () => {
    console.log('Input blurred')
  }

  return (
    <div>
      <h2>Focus Events</h2>
      <input
        type="text"
        placeholder="Focus and blur this input"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p>Check console when you focus/unfocus the input</p>
    </div>
  )
}

// EXERCISE 9: Comprehensive example - Todo input
export function TodoInput() {
  // This combines multiple concepts
  // TODO (in Session 3): Add state for input value and todos list

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Add todo to list
    // TODO: Clear input
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      // TODO: Clear input
    }
  }

  return (
    <div>
      <h2>Todo Input (Revisit in Session 3)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a todo (press Escape to clear)"
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Add</button>
      </form>
      <p>We'll complete this with state in Session 3!</p>
    </div>
  )
}
