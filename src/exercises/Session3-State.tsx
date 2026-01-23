/**
 * Session 3.1 - useState Hook
 *
 * Exercise: Managing component state
 */

import { useState } from 'react'

// EXERCISE 1: Simple counter
export function Counter() {
  // TODO: Add state for count
  // const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {/* TODO: Display count */}</p>
      <button onClick={() => {/* TODO: Increment */}}>+</button>
      <button onClick={() => {/* TODO: Decrement */}}>-</button>
      <button onClick={() => {/* TODO: Reset to 0 */}}>Reset</button>
    </div>
  )
}

// EXERCISE 2: Text input with state (controlled component)
export function NameInput() {
  // TODO: Add state for name
  // TODO: Display the name below the input as you type

  return (
    <div>
      <h2>Controlled Input</h2>
      <input
        type="text"
        placeholder="Enter your name"
        // TODO: Add value and onChange
      />
      <p>Hello, {/* TODO: Display name here */}!</p>
    </div>
  )
}

// EXERCISE 3: Multiple state variables
export function UserForm() {
  // TODO: Add state for firstName, lastName, and email

  return (
    <div>
      <h2>User Form</h2>
      <div>
        <input placeholder="First Name" />
      </div>
      <div>
        <input placeholder="Last Name" />
      </div>
      <div>
        <input placeholder="Email" type="email" />
      </div>

      <h3>Preview:</h3>
      <p>Name: {/* TODO: firstName lastName */}</p>
      <p>Email: {/* TODO: email */}</p>
    </div>
  )
}

// EXERCISE 4: Object state (better approach for forms)
interface FormData {
  firstName: string
  lastName: string
  email: string
}

export function BetterUserForm() {
  // TODO: Use a single state object instead of multiple states
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  })

  // TODO: Create a generic handleChange function
  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // TODO: Update the specific field while preserving others
    // Hint: Use spread operator { ...form, [field]: event.target.value }
  }

  return (
    <div>
      <h2>Better User Form (Single State Object)</h2>
      <div>
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange('firstName')}
        />
      </div>
      <div>
        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange('lastName')}
        />
      </div>
      <div>
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
        />
      </div>

      <h3>Preview:</h3>
      <p>Name: {form.firstName} {form.lastName}</p>
      <p>Email: {form.email}</p>
    </div>
  )
}

// EXERCISE 5: Array state
export function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  const handleAdd = () => {
    // TODO: Add input to todos array
    // Hint: setTodos([...todos, input])
    // TODO: Clear input after adding
  }

  const handleRemove = (index: number) => {
    // TODO: Remove todo at index
    // Hint: Use filter - setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>No todos yet!</p>}
    </div>
  )
}

// EXERCISE 6: Toggle state
export function ToggleVisibility() {
  // TODO: Add boolean state for isVisible

  return (
    <div>
      <h2>Toggle Visibility</h2>
      <button onClick={() => {/* TODO: Toggle isVisible */}}>
        {/* TODO: Show "Hide" if visible, "Show" if not */}
        Toggle
      </button>

      {/* TODO: Only render this paragraph if isVisible is true */}
      <p>This content can be toggled!</p>
    </div>
  )
}

// EXERCISE 7: Functional state updates
// Important when new state depends on previous state
export function FastCounter() {
  const [count, setCount] = useState(0)

  // ❌ BAD: May cause bugs with rapid clicks
  const handleBadIncrement = () => {
    setCount(count + 1)
  }

  // ✅ GOOD: Always uses latest state
  const handleGoodIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  // TODO: Try clicking both buttons rapidly and see the difference
  const handleMultipleClicks = () => {
    // This will only increment by 1 because count is stale
    handleBadIncrement()
    handleBadIncrement()
    handleBadIncrement()
  }

  const handleGoodMultipleClicks = () => {
    // This will increment by 3 correctly
    handleGoodIncrement()
    handleGoodIncrement()
    handleGoodIncrement()
  }

  return (
    <div>
      <h2>Functional Updates</h2>
      <p>Count: {count}</p>
      <button onClick={handleMultipleClicks}>Bad: +3</button>
      <button onClick={handleGoodMultipleClicks}>Good: +3</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// EXERCISE 8: Nested object state (common pitfall!)
interface User {
  name: string
  email: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

export function UserSettings() {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'light',
      notifications: true,
    },
  })

  // ❌ WRONG: This mutates state directly!
  const handleBadThemeChange = () => {
    user.preferences.theme = user.preferences.theme === 'light' ? 'dark' : 'light'
    setUser(user) // Same reference, React won't re-render!
  }

  // ✅ CORRECT: Create new objects with spread
  const handleGoodThemeChange = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        theme: user.preferences.theme === 'light' ? 'dark' : 'light',
      },
    })
  }

  const handleToggleNotifications = () => {
    // TODO: Toggle notifications using the correct pattern
  }

  return (
    <div>
      <h2>User Settings</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Theme: {user.preferences.theme}</p>
      <p>Notifications: {user.preferences.notifications ? 'On' : 'Off'}</p>

      <button onClick={handleGoodThemeChange}>Toggle Theme</button>
      <button onClick={handleToggleNotifications}>Toggle Notifications</button>
    </div>
  )
}

// EXERCISE 9: Lazy initialization
// For expensive initial state calculations
export function ExpensiveInitialization() {
  // ❌ BAD: This runs on EVERY render (even though we only need it once)
  const [data, setData] = useState(expensiveCalculation())

  // ✅ GOOD: This only runs ONCE on mount
  const [betterData, setBetterData] = useState(() => expensiveCalculation())

  return <div>Check the console to see the difference</div>
}

function expensiveCalculation() {
  console.log('Running expensive calculation...')
  // Simulate expensive work
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }
  return result
}

// EXERCISE 10: Combined exercise - Shopping Cart
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (name: string, price: number) => {
    // TODO: Check if item already exists
    // If yes, increment quantity
    // If no, add new item with quantity 1
  }

  const removeItem = (id: string) => {
    // TODO: Remove item from cart
  }

  const updateQuantity = (id: string, quantity: number) => {
    // TODO: Update item quantity
    // If quantity is 0, remove the item
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2>Shopping Cart</h2>

      <div>
        <button onClick={() => addItem('Apple', 1.5)}>Add Apple ($1.50)</button>
        <button onClick={() => addItem('Banana', 0.8)}>Add Banana ($0.80)</button>
        <button onClick={() => addItem('Orange', 2.0)}>Add Orange ($2.00)</button>
      </div>

      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  )
}
