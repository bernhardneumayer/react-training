/**
 * Session 3.1 - useState Solutions
 *
 * Reference implementations for the exercises
 */

import { useState } from 'react'

// SOLUTION 1: Simple counter
export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '20px' }}>
      <h2>Counter</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '4px' }}>
        +
      </button>
      <button onClick={() => setCount(count - 1)} style={{ margin: '4px' }}>
        -
      </button>
      <button onClick={() => setCount(0)} style={{ margin: '4px' }}>
        Reset
      </button>
    </div>
  )
}

// SOLUTION 2: Controlled input
export function NameInput() {
  const [name, setName] = useState('')

  return (
    <div style={{ padding: '20px' }}>
      <h2>Controlled Input</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{ padding: '8px', fontSize: '16px' }}
      />
      <p style={{ fontSize: '18px' }}>
        Hello, {name || 'stranger'}!
      </p>
    </div>
  )
}

// SOLUTION 3: Multiple state variables
interface User {
  firstName: string
  lastName: string
  email: string
}

export function UserForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Form (Multiple States)</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Preview:</h3>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  )
}

// SOLUTION 4: Object state (better approach for forms)
interface FormData {
  firstName: string
  lastName: string
  email: string
}

export function BetterUserForm() {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  })

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Form</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange('firstName')}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange('lastName')}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Preview:</h3>
        <p>Name: {form.firstName} {form.lastName}</p>
        <p>Email: {form.email}</p>
      </div>
    </div>
  )
}

// SOLUTION 5: Array state - Todo list
export function TodoList() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([...todos, input])
      setInput('')
    }
  }

  const handleRemove = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a todo"
          style={{ padding: '8px', fontSize: '14px', marginRight: '8px' }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No todos yet!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                padding: '12px',
                marginBottom: '8px',
                background: '#f8f9fa',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{todo}</span>
              <button
                onClick={() => handleRemove(index)}
                style={{
                  padding: '4px 12px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// SOLUTION 6: Toggle state
export function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div style={{ padding: '20px' }}>
      <h2>Toggle Visibility</h2>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{ padding: '8px 16px', marginBottom: '16px' }}
      >
        {isVisible ? 'Hide' : 'Show'}
      </button>

      {isVisible && (
        <p style={{ padding: '16px', background: '#f8f9fa', borderRadius: '4px' }}>
          This content can be toggled!
        </p>
      )}
    </div>
  )
}

// SOLUTION 7: Functional state updates
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
    <div style={{ padding: '20px' }}>
      <h2>Functional Updates</h2>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Count: {count}</p>
      <button onClick={handleMultipleClicks} style={{ margin: '4px', padding: '8px' }}>
        Bad: +3
      </button>
      <button onClick={handleGoodMultipleClicks} style={{ margin: '4px', padding: '8px' }}>
        Good: +3
      </button>
      <button onClick={() => setCount(0)} style={{ margin: '4px', padding: '8px' }}>
        Reset
      </button>
    </div>
  )
}

// SOLUTION 8: Nested object state
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

  const handleThemeChange = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        theme: user.preferences.theme === 'light' ? 'dark' : 'light',
      },
    })
  }

  const handleToggleNotifications = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications,
      },
    })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Settings</h2>
      <div style={{ marginBottom: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '4px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Theme:</strong> {user.preferences.theme}</p>
        <p><strong>Notifications:</strong> {user.preferences.notifications ? 'On' : 'Off'}</p>
      </div>

      <button onClick={handleThemeChange} style={{ margin: '4px', padding: '8px' }}>
        Toggle Theme
      </button>
      <button onClick={handleToggleNotifications} style={{ margin: '4px', padding: '8px' }}>
        Toggle Notifications
      </button>
    </div>
  )
}

// SOLUTION 9: Lazy initialization
export function ExpensiveInitialization() {
  // ❌ BAD: This runs on EVERY render
  // const [data, setData] = useState(expensiveCalculation())

  // ✅ GOOD: This only runs ONCE on mount
  const [betterData, setBetterData] = useState(() => expensiveCalculation())

  const [renderCount, setRenderCount] = useState(0)

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lazy Initialization</h2>
      <p>Check the console to see the difference!</p>
      <p>Initial value: {betterData}</p>
      <p>Render count: {renderCount}</p>
      <button
        onClick={() => setRenderCount(renderCount + 1)}
        style={{ padding: '8px 16px' }}
      >
        Force Re-render (data won't recalculate)
      </button>
    </div>
  )
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

// SOLUTION 10: Shopping cart
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (name: string, price: number) => {
    const existingItem = items.find((item) => item.name === name)

    if (existingItem) {
      // Increment quantity if item exists
      setItems(
        items.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        name,
        price,
        quantity: 1,
      }
      setItems([...items, newItem])
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Shopping Cart</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => addItem('Apple', 1.5)} style={{ margin: '4px', padding: '8px' }}>
          Add Apple ($1.50)
        </button>
        <button onClick={() => addItem('Banana', 0.8)} style={{ margin: '4px', padding: '8px' }}>
          Add Banana ($0.80)
        </button>
        <button onClick={() => addItem('Orange', 2.0)} style={{ margin: '4px', padding: '8px' }}>
          Add Orange ($2.00)
        </button>
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Cart is empty</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: '16px',
                  marginBottom: '8px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{item.name}</strong> - ${item.price.toFixed(2)} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
                <div>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ margin: '0 4px', padding: '4px 8px' }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ margin: '0 4px', padding: '4px 8px' }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      margin: '0 4px',
                      padding: '4px 8px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              background: '#007bff',
              color: 'white',
              borderRadius: '4px',
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'right',
            }}
          >
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  )
}
