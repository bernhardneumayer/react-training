/**
 * Session 1 - Event Handling Solutions
 *
 * Complete implementations for all event handling exercises
 */

import { useState } from 'react'

// EXERCISE 1: Basic click handler
export function ClickCounter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    console.log('Button clicked!')
  }

  return (
    <div>
      <h2>Click Counter</h2>
      <button onClick={handleClick}>Click me</button>
      <p>Clicked {count} times</p>
    </div>
  )
}

// EXERCISE 2: Input change handler
export function ControlledInput() {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    console.log('Input value:', event.target.value)
  }

  return (
    <div>
      <h2>Controlled Input</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={value}
        onChange={handleChange}
      />
      <p>Current value: {value}</p>
    </div>
  )
}

// EXERCISE 3: Form submission
export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted with:', { email, password })

    // Clear form after submission
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Check console for submitted values</p>
    </div>
  )
}

// EXERCISE 4: Multiple event types
export function MultiEventComponent() {
  const [log, setLog] = useState<string[]>([])

  const addLog = (message: string) => {
    setLog((prev) => [...prev.slice(-4), message])
  }

  const handleClick = () => {
    console.log('Clicked')
    addLog('Clicked')
  }

  const handleDoubleClick = () => {
    console.log('Double clicked')
    addLog('Double clicked')
  }

  const handleMouseEnter = () => {
    console.log('Mouse entered')
    addLog('Mouse entered')
  }

  const handleMouseLeave = () => {
    console.log('Mouse left')
    addLog('Mouse left')
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
      <div style={{ marginTop: '10px' }}>
        <strong>Event log:</strong>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// EXERCISE 5: Passing data with events
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
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Curry the function - creates a closure with the id
  const handleGoodClick = (id: string) => () => {
    console.log('Clicked item:', id)
    setSelectedId(id)
  }

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={handleGoodClick(item.id)}>Select</button>
            {selectedId === item.id && ' (Selected)'}
          </li>
        ))}
      </ul>
      {selectedId && <p>Selected ID: {selectedId}</p>}
    </div>
  )
}

// EXERCISE 6: Keyboard events
export function KeyboardHandler() {
  const [value, setValue] = useState('')
  const [lastKey, setLastKey] = useState('')

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Key pressed:', event.key)
    setLastKey(event.key)

    if (event.key === 'Enter') {
      console.log('Enter key pressed!')
      alert(`You pressed Enter with value: ${value}`)
    }

    if (event.key === 'Escape') {
      console.log('Escape key pressed!')
      setValue('')
    }
  }

  return (
    <div>
      <h2>Keyboard Events</h2>
      <input
        type="text"
        placeholder="Press Enter or Escape"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <p>Last key pressed: {lastKey}</p>
      <p>Current value: {value}</p>
    </div>
  )
}

// EXERCISE 7: Event bubbling and stopPropagation
export function EventBubbling() {
  const [log, setLog] = useState<string[]>([])
  const [stopBubbling, setStopBubbling] = useState(false)

  const addLog = (message: string) => {
    setLog((prev) => [...prev.slice(-4), message])
  }

  const handleParentClick = () => {
    console.log('Parent clicked')
    addLog('Parent clicked')
  }

  const handleChildClick = (event: React.MouseEvent) => {
    console.log('Child clicked')
    addLog('Child clicked')

    if (stopBubbling) {
      event.stopPropagation()
      addLog('(bubbling stopped)')
    }
  }

  return (
    <div>
      <h2>Event Bubbling</h2>
      <label>
        <input
          type="checkbox"
          checked={stopBubbling}
          onChange={(e) => setStopBubbling(e.target.checked)}
        />
        Stop Propagation
      </label>
      <div
        onClick={handleParentClick}
        style={{ padding: '20px', border: '2px solid blue', marginTop: '10px' }}
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
      <div style={{ marginTop: '10px' }}>
        <strong>Event log:</strong>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      <p>
        Notice: When unchecked, clicking child triggers both handlers. When
        checked, stopPropagation prevents parent handler from firing.
      </p>
    </div>
  )
}

// EXERCISE 8: Focus and blur events
export function FocusEvents() {
  const [isFocused, setIsFocused] = useState(false)
  const [focusCount, setFocusCount] = useState(0)

  const handleFocus = () => {
    console.log('Input focused')
    setIsFocused(true)
    setFocusCount((prev) => prev + 1)
  }

  const handleBlur = () => {
    console.log('Input blurred')
    setIsFocused(false)
  }

  return (
    <div>
      <h2>Focus Events</h2>
      <input
        type="text"
        placeholder="Focus and blur this input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          border: isFocused ? '2px solid blue' : '1px solid gray',
          padding: '8px',
        }}
      />
      <p>Status: {isFocused ? 'Focused' : 'Not focused'}</p>
      <p>Focus count: {focusCount}</p>
    </div>
  )
}

// EXERCISE 9: Comprehensive example - Todo input
export function TodoInput() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<string[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputValue.trim()) {
      setTodos((prev) => [...prev, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setInputValue('')
    }
  }

  const handleDelete = (index: number) => () => {
    setTodos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2>Todo Input</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a todo (press Escape to clear)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={handleDelete(index)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p>No todos yet. Add one above!</p>}
    </div>
  )
}
