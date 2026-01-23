/**
 * Session 3.3 - useRef Hook
 *
 * Exercise: Working with refs and mutable values
 */

import { useState, useEffect, useRef } from 'react'

// EXERCISE 1: Focus input on mount
export function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // TODO: Focus the input when component mounts
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <h2>Auto Focus Input</h2>
      <input ref={inputRef} type="text" placeholder="I should be focused!" />
      <p>The input should be focused when the component loads</p>
    </div>
  )
}

// EXERCISE 2: Manual focus control
export function FocusButton() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    // TODO: Focus the input when button is clicked
    inputRef.current?.focus()
  }

  const handleClear = () => {
    // TODO: Clear the input value
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div>
      <h2>Manual Focus Control</h2>
      <input ref={inputRef} type="text" placeholder="Click button to focus" />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear Input</button>
    </div>
  )
}

// EXERCISE 3: Scroll to element
export function ScrollToSection() {
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const section3Ref = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <h2>Scroll to Section</h2>
      <div style={{ position: 'sticky', top: 0, background: 'white', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <button onClick={() => scrollToSection(section1Ref)}>Go to Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Go to Section 3</button>
      </div>

      <div ref={section1Ref} style={{ height: '400px', background: '#ffcccc', padding: '20px' }}>
        <h3>Section 1</h3>
        <p>Content here...</p>
      </div>

      <div ref={section2Ref} style={{ height: '400px', background: '#ccffcc', padding: '20px' }}>
        <h3>Section 2</h3>
        <p>Content here...</p>
      </div>

      <div ref={section3Ref} style={{ height: '400px', background: '#ccccff', padding: '20px' }}>
        <h3>Section 3</h3>
        <p>Content here...</p>
      </div>
    </div>
  )
}

// EXERCISE 4: Store interval ID (useRef for non-rendering values)
export function StopwatchWithRef() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = () => {
    if (isRunning) return

    setIsRunning(true)
    // TODO: Store interval ID in intervalRef
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
  }

  const stop = () => {
    setIsRunning(false)
    // TODO: Clear the interval using intervalRef
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const reset = () => {
    stop()
    setTime(0)
  }

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>Time: {time} seconds</p>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

// EXERCISE 5: Track previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    // TODO: Store current value in ref after render
    ref.current = value
  }, [value])

  // TODO: Return the previous value (which is still in ref.current)
  return ref.current
}

export function PreviousValueDemo() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <h2>Previous Value</h2>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCount ?? 'none'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}

// EXERCISE 6: Track render count
export function RenderCounter() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  // This runs on every render
  renderCount.current++

  return (
    <div>
      <h2>Render Counter</h2>
      <p>Count: {count}</p>
      <p>Component has rendered {renderCount.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>Notice: Updating ref doesn't trigger re-render</p>
    </div>
  )
}

// EXERCISE 7: useRef vs useState comparison
export function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)

  const incrementState = () => {
    setStateCount(stateCount + 1) // Triggers re-render
  }

  const incrementRef = () => {
    refCount.current++ // Does NOT trigger re-render
    console.log('Ref count:', refCount.current)
  }

  return (
    <div>
      <h2>useRef vs useState</h2>
      <p>State count (visible): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State (re-renders)</button>
      <button onClick={incrementRef}>Increment Ref (no re-render)</button>

      <p>
        Click "Increment Ref" multiple times, then click "Increment State".
        You'll see the ref count update all at once!
      </p>
    </div>
  )
}

// EXERCISE 8: Video player controls
export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    videoRef.current?.pause()
    setIsPlaying(false)
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div>
      <h2>Video Player</h2>
      <video
        ref={videoRef}
        width="400"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />
      <div>
        <button onClick={handlePlay} disabled={isPlaying}>Play</button>
        <button onClick={handlePause} disabled={!isPlaying}>Pause</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  )
}

// EXERCISE 9: Measure element size
export function ElementSize() {
  const divRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const measureSize = () => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect()
      setSize({ width, height })
    }
  }

  useEffect(() => {
    // Measure on mount
    measureSize()

    // Re-measure on window resize
    window.addEventListener('resize', measureSize)
    return () => window.removeEventListener('resize', measureSize)
  }, [])

  return (
    <div>
      <h2>Element Size</h2>
      <div
        ref={divRef}
        style={{
          width: '50%',
          height: '200px',
          background: '#eee',
          border: '2px solid #333',
        }}
      >
        Resize the window and watch the size update
      </div>
      <p>Width: {size.width.toFixed(0)}px</p>
      <p>Height: {size.height.toFixed(0)}px</p>
      <button onClick={measureSize}>Measure Now</button>
    </div>
  )
}

// EXERCISE 10: Click outside detector
export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // TODO: Check if click was outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      // TODO: Add event listener for clicks
      document.addEventListener('mousedown', handleClickOutside)
    }

    // TODO: Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div>
      <h2>Click Outside Detector</h2>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            marginTop: '10px',
            padding: '20px',
            border: '2px solid #333',
            background: 'white',
          }}
        >
          <p>Click outside this box to close it</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

// EXERCISE 11: Uncontrolled form with refs
export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: Get values from refs (not from state!)
    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    }

    console.log('Form submitted:', formData)

    // TODO: Clear the form
    if (nameRef.current) nameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (messageRef.current) messageRef.current.value = ''
  }

  return (
    <div>
      <h2>Uncontrolled Form (Using Refs)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={nameRef} placeholder="Name" />
        </div>
        <div>
          <input ref={emailRef} type="email" placeholder="Email" />
        </div>
        <div>
          <textarea ref={messageRef} placeholder="Message" rows={4} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Check console for submitted values</p>
    </div>
  )
}
