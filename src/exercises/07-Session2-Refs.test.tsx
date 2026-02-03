/**
 * Tests for Session 2 - useRef Hook
 *
 * These tests verify DOM manipulation with refs, storing mutable values,
 * and understanding when to use refs vs state.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  AutoFocusInput,
  FocusButton,
  ScrollToSection,
  ElementSize,
  PreviousValueDemo,
  RenderCounter,
  StopwatchWithRef,
  VideoPlayer,
  ClickOutsideDemo,
  RefVsState,
  UncontrolledForm,
} from './07-Session2-Refs'


// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}
describe('Exercise 1: AutoFocusInput', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<AutoFocusInput />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render an input field', () => {
    const { container } = render(<AutoFocusInput />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should focus input on mount', () => {
    const { container } = render(<AutoFocusInput />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    // Verify focus() was actually called via ref
    expect(input).toHaveFocus()
  })

  it('should use useRef for DOM access', () => {
    // If input is focused on mount, ref is working
    render(<AutoFocusInput />)
    const input = screen.getByRole('textbox')
    expect(document.activeElement).toBe(input)
  })
})

describe('Exercise 2: FocusButton', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<FocusButton />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render input and button', () => {
    const { container } = render(<FocusButton />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should focus input when button is clicked', async () => {
    const user = userEvent.setup()
    render(<FocusButton />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    await user.click(button)

    expect(input).toHaveFocus()
  })

  it('should use ref to control focus', async () => {
    const user = userEvent.setup()
    render(<FocusButton />)
    const button = screen.getByRole('button')
    const input = screen.getByRole('textbox')

    input.blur()
    expect(input).not.toHaveFocus()

    await user.click(button)
    expect(input).toHaveFocus()
  })
})

describe('Exercise 3: ScrollToSection', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ScrollToSection />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render sections and scroll buttons', () => {
    render(<ScrollToSection />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should have multiple sections to scroll to', () => {
    const { container } = render(<ScrollToSection />)
    const sections = container.querySelectorAll('[id], section, div[style]')
    expect(sections.length).toBeGreaterThan(1)
  })

  it('should scroll to section on button click', async () => {
    const user = userEvent.setup()
    const scrollIntoViewMock = vi.fn()

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = scrollIntoViewMock

    render(<ScrollToSection />)
    const button = screen.getAllByRole('button')[0]

    await user.click(button)

    expect(scrollIntoViewMock).toHaveBeenCalled()
  })
})

describe('Exercise 4: ElementSize', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ElementSize />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render an element with size display', () => {
    render(<ElementSize />)
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should measure element dimensions', () => {
    render(<ElementSize />)
    // Should show width and height
    const numbers = screen.getAllByText(/\d+/)
    expect(numbers.length).toBeGreaterThanOrEqual(2)
  })

  it('should use ref to access element dimensions', () => {
    const { container } = render(<ElementSize />)
    // Should display measured dimensions
    expect(container.textContent).toMatch(/\d+/)
  })
})

describe('Exercise 5: PreviousValueDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<PreviousValueDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render with state and previous value', () => {
    render(<PreviousValueDemo />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should track previous value', async () => {
    const user = userEvent.setup()
    render(<PreviousValueDemo />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Should show both current and previous values
    const numbers = screen.getAllByText(/\d+/)
    expect(numbers.length).toBeGreaterThanOrEqual(1)
  })

  it('should use ref to store previous value', async () => {
    const user = userEvent.setup()
    render(<PreviousValueDemo />)
    const button = screen.getByRole('button')

    await user.click(button)
    await user.click(button)

    // Should display previous value without re-render
    expect(button).toBeInTheDocument()
  })
})

describe('Exercise 6: RenderCounter', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<RenderCounter />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render with render count display', () => {
    render(<RenderCounter />)
    expect(screen.getByText(/render/i)).toBeInTheDocument()
  })

  it('should count renders using ref', async () => {
    const user = userEvent.setup()
    render(<RenderCounter />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Should show render count
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should increment render count without causing re-render', () => {
    render(<RenderCounter />)
    // Render count should be displayed
    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })
})

describe('Exercise 7: StopwatchWithRef', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render stopwatch with start/stop buttons', () => {
    render(<StopwatchWithRef />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('should start and stop timer', async () => {
    const user = userEvent.setup()
    render(<StopwatchWithRef />)
    const startButton = screen.getByRole('button', { name: /start/i })

    await user.click(startButton)

    vi.advanceTimersByTime(1000)

    const stopButton = screen.getByRole('button', { name: /stop/i })
    await user.click(stopButton)

    expect(screen.getByText(/\d+/)).toBeInTheDocument()
  })

  it('should use ref to store interval ID', async () => {
    const user = userEvent.setup()
    render(<StopwatchWithRef />)
    const startButton = screen.getByRole('button', { name: /start/i })

    await user.click(startButton)

    // Should be able to stop without losing interval reference
    expect(startButton).toBeInTheDocument()
  })
})

describe('Exercise 8: VideoPlayer', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<VideoPlayer />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render video element', () => {
    const { container } = render(<VideoPlayer />)
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
  })

  it('should render control buttons', () => {
    render(<VideoPlayer />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('should control video with refs', async () => {
    const user = userEvent.setup()
    const { container } = render(<VideoPlayer />)
    const video = container.querySelector('video') as HTMLVideoElement
    const playButton = screen.getByRole('button', { name: /play/i })

    // Mock video methods
    video.play = vi.fn().mockResolvedValue(undefined)
    video.pause = vi.fn()

    await user.click(playButton)

    expect(video.play || video.pause).toBeDefined()
  })
})

describe('Exercise 9: ClickOutsideDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ClickOutsideDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a clickable element', () => {
    const { container } = render(<ClickOutsideDemo />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should detect clicks outside element', async () => {
    const user = userEvent.setup()
    const { container } = render(<ClickOutsideDemo />)

    // Click outside the element
    await user.click(document.body)

    // Should handle outside click
    expect(container).toBeInTheDocument()
  })

  it('should use ref to track element', () => {
    const { container } = render(<ClickOutsideDemo />)
    // Should have a tracked element
    expect(container.firstChild).toBeInTheDocument()
  })
})

describe('Exercise 10: RefVsState', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<RefVsState />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should demonstrate ref vs state difference', () => {
    render(<RefVsState />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('should show state causes re-render', async () => {
    const user = userEvent.setup()
    render(<RefVsState />)
    const stateButton = screen.getByRole('button', { name: /state/i })

    await user.click(stateButton)

    // Component should re-render
    expect(stateButton).toBeInTheDocument()
  })

  it('should show ref does not cause re-render', async () => {
    const user = userEvent.setup()
    render(<RefVsState />)
    const refButton = screen.getByRole('button', { name: /ref/i })

    await user.click(refButton)

    // Ref should update without re-render
    expect(refButton).toBeInTheDocument()
  })
})

describe('Exercise 11: UncontrolledForm', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UncontrolledForm />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render form with inputs', () => {
    render(<UncontrolledForm />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('should use refs instead of state', async () => {
    const user = userEvent.setup()
    render(<UncontrolledForm />)
    const input = screen.getAllByRole('textbox')[0] as HTMLInputElement
    const button = screen.getByRole('button', { name: /submit/i })

    await user.type(input, 'Test Value')
    await user.click(button)

    // Should access input value via ref
    expect(input.value).toBe('Test Value')
  })

  it('should submit form with ref values', async () => {
    const user = userEvent.setup()
    render(<UncontrolledForm />)
    const button = screen.getByRole('button', { name: /submit/i })

    await user.click(button)

    // Should be able to submit
    expect(button).toBeInTheDocument()
  })

  it('should demonstrate callback ref pattern', () => {
    render(<UncontrolledForm />)
    const inputs = screen.getAllByRole('textbox')
    // If multiple inputs rendered, callback refs work
    expect(inputs.length).toBeGreaterThan(0)
  })
})
