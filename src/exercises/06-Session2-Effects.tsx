/**
 * Session 3.2 - useEffect Hook
 *
 * Exercise: Side effects and lifecycle
 */

import { useState, useEffect } from 'react'

// EXERCISE 1: Run once on mount
export function MountLogger() {
  useEffect(() => {
    console.log('Component mounted!')

    // TODO: Add cleanup function that logs "Component unmounted!"
    return () => {
      console.log('Component unmounted!')
    }
  }, []) // Empty dependency array = run once on mount

  return <div>Check the console when this component mounts/unmounts</div>
}

// EXERCISE 2: Document title sync
export function PageTitle() {
  const [title, setTitle] = useState('React Training')

  useEffect(() => {
    // TODO: Update document.title with the current title
    // TODO: Restore original title on cleanup
  }, [title]) // Re-run when title changes

  return (
    <div>
      <h2>Page Title</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter page title"
      />
      <p>Look at the browser tab title!</p>
    </div>
  )
}

// EXERCISE 3: Data fetching
interface User {
  id: number
  name: string
  email: string
}

export function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Implement data fetching
    // API endpoint: https://jsonplaceholder.typicode.com/users/${userId}
    // Think about: loading states, error handling, and async/await pattern
    // Important: Check the isCancelled flag before updating state - why is this needed?

    let isCancelled = false

    const fetchUser = async () => {
      // TODO: Implement fetch logic with try/catch/finally
    }

    fetchUser()

    return () => {
      isCancelled = true
    }
  }, [userId]) // Re-fetch when userId changes

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user found</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  )
}

// Test component for UserProfile
export function UserProfileDemo() {
  const [userId, setUserId] = useState(1)

  return (
    <div>
      <h2>User Profile Demo</h2>
      <div>
        <button onClick={() => setUserId(1)}>User 1</button>
        <button onClick={() => setUserId(2)}>User 2</button>
        <button onClick={() => setUserId(3)}>User 3</button>
      </div>
      <UserProfile userId={userId} />
    </div>
  )
}

// EXERCISE 4: Timer with cleanup
export function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // TODO: If isRunning, create an interval that increments seconds every second
    // TODO: Clean up the interval when component unmounts or isRunning changes

    if (!isRunning) return

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning])

  return (
    <div>
      <h2>Timer</h2>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  )
}

// EXERCISE 5: Window resize listener
export function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    // TODO: Add event listener for 'resize' event
    // TODO: Update size state when window resizes
    // TODO: Clean up event listener on unmount

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // TODO: Add the event listener
    // TODO: Return cleanup function that removes the listener
  }, [])

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p>Try resizing your browser window!</p>
    </div>
  )
}

// EXERCISE 6: Local storage sync
export function PersistentCounter() {
  const [count, setCount] = useState(() => {
    // TODO: Initialize from localStorage if available
    const saved = localStorage.getItem('counter')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    // TODO: Save count to localStorage whenever it changes
    localStorage.setItem('counter', count.toString())
  }, [count])

  return (
    <div>
      <h2>Persistent Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <p>Refresh the page - your count persists!</p>
    </div>
  )
}

// EXERCISE 7: Debounced search
export function SearchInput() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    // TODO: Set up a timeout that updates debouncedQuery after 500ms
    // TODO: Clear the timeout if query changes before 500ms (cleanup)

    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [query])

  // This effect would trigger API call
  useEffect(() => {
    if (debouncedQuery) {
      console.log('Searching for:', debouncedQuery)
      // TODO: In a real app, call search API here
    }
  }, [debouncedQuery])

  return (
    <div>
      <h2>Debounced Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
      />
      <p>Current query: {query}</p>
      <p>Debounced query: {debouncedQuery}</p>
      <p>Check console - search only happens after you stop typing!</p>
    </div>
  )
}

// EXERCISE 8: Dependency array mistakes
export function DependencyArrayDemo() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  // ❌ WRONG: Missing dependency
  useEffect(() => {
    console.log('Effect ran. Count:', count)
    // Using multiplier but not in deps!
    console.log('Multiplied:', count * multiplier)
  }, [count]) // Should be [count, multiplier]

  // ❌ WRONG: Object in dependencies (causes infinite loop)
  // ⚠️  WARNING: The code below is commented out because it causes an INFINITE LOOP!
  // Uncommenting this will freeze your browser tab.
  // const config = { apiUrl: '/api' } // New object every render!
  // useEffect(() => {
  //   console.log('Fetching with config:', config)
  //   // This will run forever because config !== config (new object reference each render)
  // }, [config])

  // ✅ CORRECT: Use primitives or useMemo
  const apiUrl = '/api'
  useEffect(() => {
    console.log('Fetching from:', apiUrl)
  }, [apiUrl])

  return (
    <div>
      <h2>Dependency Array Demo</h2>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increment Multiplier
      </button>
      <p>Check console for effect logs</p>
    </div>
  )
}

// EXERCISE 9: When NOT to use useEffect
export function DerivedStateExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', active: true },
    { id: 2, name: 'Banana', active: false },
    { id: 3, name: 'Orange', active: true },
  ])

  // ❌ WRONG: Don't use effect for derived state
  const [activeItems, setActiveItems] = useState<typeof items>([])
  useEffect(() => {
    setActiveItems(items.filter((item) => item.active))
  }, [items])

  // ✅ CORRECT: Just calculate it during render
  const correctActiveItems = items.filter((item) => item.active)

  return (
    <div>
      <h2>Derived State</h2>
      <p>Active items: {correctActiveItems.length}</p>
      {/* No need for useEffect here! */}
    </div>
  )
}

// EXERCISE 10: Complex example - Chat room subscription
export function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // TODO: Simulate connecting to chat room
    console.log(`Connecting to room: ${roomId}`)
    setIsConnected(true)

    // TODO: Simulate receiving messages
    const messageInterval = setInterval(() => {
      const randomMessage = `Message in ${roomId}: ${Date.now()}`
      setMessages((prev) => [...prev, randomMessage])
    }, 3000)

    // TODO: Cleanup - disconnect and stop receiving messages
    return () => {
      console.log(`Disconnecting from room: ${roomId}`)
      setIsConnected(false)
      clearInterval(messageInterval)
    }
  }, [roomId]) // Reconnect when roomId changes

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '200px', overflow: 'auto' }}>
        {messages.length === 0 ? (
          <p>No messages yet...</p>
        ) : (
          <ul>
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// Test component for ChatRoom
export function ChatRoomDemo() {
  const [roomId, setRoomId] = useState('general')

  return (
    <div>
      <h2>Chat Room Demo</h2>
      <div>
        <button onClick={() => setRoomId('general')}>General</button>
        <button onClick={() => setRoomId('random')}>Random</button>
        <button onClick={() => setRoomId('help')}>Help</button>
      </div>
      <ChatRoom roomId={roomId} />
      <p>Switch rooms and check console for connect/disconnect logs</p>
    </div>
  )
}
