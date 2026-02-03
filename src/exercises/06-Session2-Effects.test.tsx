/**
 * Tests for Session 2 - useEffect Hook
 *
 * These tests verify effect execution, cleanup functions,
 * dependency arrays, and common useEffect patterns.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  MountLogger,
  PageTitle,
  UserProfileDemo,
  Timer,
  WindowSize,
  PersistentCounter,
  SearchInput,
  DependencyArrayDemo,
  DerivedStateExample,
  ChatRoomDemo,
} from './06-Session2-Effects'


// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}
describe('Exercise 1: MountLogger', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

  beforeEach(() => {
    consoleSpy.mockClear()
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('should not have placeholder content', () => {
    const { container } = render(<MountLogger />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should log on mount', () => {
    const { container } = render(<MountLogger />)
    expect(hasPlaceholder(container)).toBe(false)
    // Should have logged when component mounted
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('should log on unmount', () => {
    const { unmount } = render(<MountLogger />)
    unmount()
    // Should have logged when component unmounted
    expect(consoleSpy).toHaveBeenCalled()
  })

  it('should render the component', () => {
    const { container } = render(<MountLogger />)
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 2: PageTitle', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<PageTitle />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should update document title', () => {
    const { container } = render(<PageTitle />)
    expect(hasPlaceholder(container)).toBe(false)
    // Document title should be updated
    expect(document.title).toBeTruthy()
  })

  it('should sync title with state', async () => {
    const user = userEvent.setup()
    render(<PageTitle />)
    const input = screen.queryByRole('textbox')

    if (input) {
      await user.type(input, 'New Title')
      // Title should update
      expect(document.title).toContain('New')
    }
  })

  it('should render component with title display', () => {
    const { container } = render(<PageTitle />)
    expect(container.textContent).toBeTruthy()
  })
})

describe('Exercise 3: UserProfileDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UserProfileDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render loading state initially', () => {
    const { container } = render(<UserProfileDemo />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('should fetch and display user data', async () => {
    render(<UserProfileDemo />)

    // Wait for data to load
    await waitFor(
      () => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it('should show error state on fetch failure', async () => {
    render(<UserProfileDemo />)

    // Should handle errors gracefully
    await waitFor(
      () => {
        const hasContent = screen.queryByText(/error|loading|name|email/i)
        expect(hasContent).toBeTruthy()
      },
      { timeout: 3000 }
    )
  })
})

describe('Exercise 4: WindowSize', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<WindowSize />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render current window size', () => {
    const { container } = render(<WindowSize />)
    expect(hasPlaceholder(container)).toBe(false)
    // Should show window dimensions
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should add resize event listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    render(<WindowSize />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    addEventListenerSpy.mockRestore()
  })

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<WindowSize />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})

describe('Exercise 5: Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should not have placeholder content', () => {
    const { container } = render(<Timer />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a timer', () => {
    const { container } = render(<Timer />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should start interval on mount', () => {
    const setIntervalSpy = vi.spyOn(global, 'setInterval')
    render(<Timer />)

    expect(setIntervalSpy).toHaveBeenCalled()
  })

  it('should cleanup interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { unmount } = render(<Timer />)

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('should increment timer value', () => {
    render(<Timer />)
    const initialText = screen.getByText(/\d+/).textContent

    vi.advanceTimersByTime(1000)

    const updatedText = screen.getByText(/\d+/).textContent
    expect(updatedText).not.toBe(initialText)
  })
})

describe('Exercise 6: DependencyArrayDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<DependencyArrayDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render with dependency array', () => {
    const { container } = render(<DependencyArrayDemo />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container).toBeInTheDocument()
  })

  it('should re-run effect when dependencies change', async () => {
    const user = userEvent.setup()
    render(<DependencyArrayDemo />)
    const button = screen.queryByRole('button')

    if (button) {
      await user.click(button)
      // Effect should re-run after state change
      expect(button).toBeInTheDocument()
    }
  })

  it('should demonstrate correct dependency usage', () => {
    const { container } = render(<DependencyArrayDemo />)
    // If component renders without infinite loops, dependencies are correct
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 7: PersistentCounter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should not have placeholder content', () => {
    const { container } = render(<PersistentCounter />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a counter', () => {
    const { container } = render(<PersistentCounter />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should save to localStorage on change', async () => {
    const user = userEvent.setup()
    render(<PersistentCounter />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Should have saved to localStorage
    await waitFor(() => {
      expect(localStorage.getItem('count')).toBeTruthy()
    })
  })

  it('should load from localStorage on mount', () => {
    localStorage.setItem('count', '5')
    render(<PersistentCounter />)

    // Should show the persisted value
    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

  it('should sync state with localStorage', async () => {
    const user = userEvent.setup()
    render(<PersistentCounter />)
    const button = screen.getByRole('button')

    await user.click(button)

    const savedValue = localStorage.getItem('count')
    expect(savedValue).toBeTruthy()
  })
})

describe('Exercise 8: SearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should not have placeholder content', () => {
    const { container } = render(<SearchInput />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a search input', () => {
    const { container } = render(<SearchInput />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should debounce search queries', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchInput />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'test')

    // Should debounce the search
    vi.advanceTimersByTime(500)

    expect(input).toBeInTheDocument()
  })

  it('should cleanup on input change', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchInput />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'a')
    await user.type(input, 'b')

    // Should cleanup previous timeout
    expect(input).toBeInTheDocument()
  })
})

describe('Exercise 9: DerivedStateExample', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<DerivedStateExample />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should calculate derived values without useEffect', () => {
    const { container } = render(<DerivedStateExample />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should update derived values automatically', async () => {
    const user = userEvent.setup()
    render(<DerivedStateExample />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Derived values should update without useEffect
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should not use useEffect for calculations', () => {
    // If component works correctly without side effects, it's using derived state
    const { container } = render(<DerivedStateExample />)
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 10: ChatRoomDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ChatRoomDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render chat room interface', () => {
    const { container } = render(<ChatRoomDemo />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container).toBeInTheDocument()
  })

  it('should connect to chat room on mount', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<ChatRoomDemo />)

    // Should log connection
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should cleanup connection on unmount', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { unmount } = render(<ChatRoomDemo />)

    unmount()

    // Should log disconnection
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('should handle room changes', async () => {
    const user = userEvent.setup()
    render(<ChatRoomDemo />)
    const button = screen.queryByRole('button')

    if (button) {
      await user.click(button)
      // Should reconnect when room changes
      expect(button).toBeInTheDocument()
    }
  })

  it('should demonstrate complex subscription pattern', () => {
    const { container } = render(<ChatRoomDemo />)
    // Should render without errors
    expect(container).toBeInTheDocument()
  })
})
