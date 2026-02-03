/**
 * Session 3.2 - useEffect Hook - SOLUTIONS
 *
 * This file contains complete solutions for the useEffect exercises.
 * Key concepts covered:
 * - Running effects on mount/unmount
 * - Synchronizing with external systems (document title, window events)
 * - Data fetching with proper cleanup
 * - Timer management
 * - Event listeners and cleanup
 * - Local storage synchronization
 * - Debouncing with useEffect
 * - Proper dependency arrays
 * - When NOT to use useEffect
 * - Complex subscriptions with cleanup
 */

import { useState, useEffect } from 'react'

// SOLUTION 1: Run once on mount
export function MountLogger() {
  useEffect(() => {
    console.log('Component mounted!')

    // Cleanup function runs when component unmounts
    return () => {
      console.log('Component unmounted!')
    }
  }, []) // Empty dependency array = run once on mount

  return <div>Check the console when this component mounts/unmounts</div>
}

// SOLUTION 2: Document title sync
export function PageTitle() {
  const [title, setTitle] = useState('React Training')

  useEffect(() => {
    // Save original title
    const originalTitle = document.title

    // Update document title with current title
    document.title = title

    // Restore original title when component unmounts
    return () => {
      document.title = originalTitle
    }
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

// SOLUTION 3: Data fetching
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
    // Cleanup flag to prevent state updates if userId changes mid-request
    let isCancelled = false

    const fetchUser = async () => {
      // Reset state for new fetch
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()

        // Only update state if the request wasn't cancelled
        if (!isCancelled) {
          setUser(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()

    // Cleanup function - prevents state updates after userId changes
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

// SOLUTION 4: Timer with cleanup
export function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // Only create interval if timer is running
    if (!isRunning) return

    // Create interval that increments seconds every second
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // Cleanup: clear interval when component unmounts or isRunning changes
    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning]) // Re-run when isRunning changes

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

// SOLUTION 5: Window resize listener
export function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    // Handler function to update size state
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup: remove event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array = run once on mount

  return (
    <div>
      <h2>Window Size</h2>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p>Try resizing your browser window!</p>
    </div>
  )
}

// SOLUTION 6: Local storage sync
export function PersistentCounter() {
  // Initialize from localStorage using lazy initialization
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counter')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    // Save count to localStorage whenever it changes
    localStorage.setItem('counter', count.toString())
  }, [count]) // Run when count changes

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

// SOLUTION 7: Debounced search
export function SearchInput() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    // Set up timeout to update debouncedQuery after 500ms
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    // Cleanup: clear timeout if query changes before 500ms
    // This prevents the previous timeout from running
    return () => {
      clearTimeout(timeoutId)
    }
  }, [query]) // Re-run when query changes

  // This effect triggers when debouncedQuery changes
  // In a real app, this is where you'd call your search API
  useEffect(() => {
    if (debouncedQuery) {
      console.log('Searching for:', debouncedQuery)
      // API call would go here:
      // fetch(`/api/search?q=${debouncedQuery}`)
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

// SOLUTION 8: Dependency array mistakes (CORRECTED)
export function DependencyArrayDemo() {
  const [count, setCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  // ✅ CORRECT: Include all dependencies
  useEffect(() => {
    console.log('Effect ran. Count:', count)
    console.log('Multiplied:', count * multiplier)
  }, [count, multiplier]) // Both count and multiplier in deps

  // ✅ CORRECT: Extract primitive value instead of object
  const apiUrl = '/api'
  useEffect(() => {
    console.log('Fetching from:', apiUrl)
    // This won't cause infinite loop because apiUrl is a primitive string
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

// SOLUTION 9: When NOT to use useEffect
export function DerivedStateExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', active: true },
    { id: 2, name: 'Banana', active: false },
    { id: 3, name: 'Orange', active: true },
  ])

  // ✅ CORRECT: Just calculate derived state during render
  // No need for useEffect or separate state!
  const activeItems = items.filter((item) => item.active)

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ))
  }

  return (
    <div>
      <h2>Derived State</h2>
      <p>Active items: {activeItems.length}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.active}
                onChange={() => toggleItem(item.id)}
              />
              {item.name} {item.active ? '✓' : '✗'}
            </label>
          </li>
        ))}
      </ul>
      <p>Note: No useEffect needed for derived state!</p>
    </div>
  )
}

// SOLUTION 10: Complex example - Chat room subscription
export function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate connecting to chat room
    console.log(`Connecting to room: ${roomId}`)
    setIsConnected(true)

    // Simulate receiving messages every 3 seconds
    const messageInterval = setInterval(() => {
      const randomMessage = `Message in ${roomId}: ${Date.now()}`
      setMessages((prev) => [...prev, randomMessage])
    }, 3000)

    // Cleanup function - runs when roomId changes or component unmounts
    return () => {
      console.log(`Disconnecting from room: ${roomId}`)
      setIsConnected(false)
      clearInterval(messageInterval)
      // Reset messages when changing rooms
      setMessages([])
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
