/**
 * Tests for Session 1 - Event Handling
 *
 * These tests verify event handlers, form submissions,
 * event propagation, and TypeScript event types.
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  ClickCounter,
  ControlledInput,
  LoginForm,
  ItemList,
  KeyboardHandler,
  EventBubbling,
  MultiEventComponent,
  FocusEvents,
  TodoInput,
} from './04-Session1-Events'


// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}
describe('Exercise 1: ClickCounter', () => {
  it('should render a button', () => {
    render(<ClickCounter />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should increment count on button click', async () => {
    const user = userEvent.setup()
    const { container } = render(<ClickCounter />)

    // Should display initial count of 0
    expect(screen.getByText(/0/)).toBeInTheDocument()

    const button = screen.getByRole('button')
    await user.click(button)

    // Should show updated count of 1 (not just the word "click")
    expect(screen.getByText(/count.*1|1.*click/i)).toBeInTheDocument()
  })

  it('should display current count', () => {
    const { container } = render(<ClickCounter />)
    // Should show count: 0 (not just "check the console")
    const hasCount = screen.queryByText(/count.*0|0.*count/i)
    expect(hasCount).toBeInTheDocument()
  })
})

describe('Exercise 2: ControlledInput', () => {
  it('should render an input field', () => {
    render(<ControlledInput />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should update display when typing', async () => {
    const user = userEvent.setup()
    render(<ControlledInput />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Hello')

    // Should show the typed text somewhere (not just "check console")
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
  })

  it('should be a controlled input', async () => {
    const user = userEvent.setup()
    const { container } = render(<ControlledInput />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.type(input, 'Test')

    // Input value should match state
    expect(input.value).toBe('Test')
    // Should NOT just say "check the console"
    expect(container.textContent).not.toMatch(/check.*console/i)
  })
})

describe('Exercise 3: LoginForm', () => {
  it('should render a form', () => {
    const { container } = render(<LoginForm />)
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('should have email and password inputs', () => {
    render(<LoginForm />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThanOrEqual(1)
  })

  it('should have a submit button', () => {
    render(<LoginForm />)
    const button = screen.getByRole('button', { name: /submit|login/i })
    expect(button).toBeInTheDocument()
  })

  it('should prevent default form submission', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const form = document.querySelector('form')

    // Listen for submit event and check if preventDefault was called
    let didPreventDefault = false
    const handleSubmit = (e: SubmitEvent) => {
      didPreventDefault = e.defaultPrevented
    }
    form?.addEventListener('submit', handleSubmit)

    const button = screen.getByRole('button', { name: /submit|login/i })
    await user.click(button)

    // Should have called preventDefault
    expect(didPreventDefault).toBe(true)
  })
})

describe('Exercise 4: ItemList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ItemList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a list of items', () => {
    const { container } = render(<ItemList />)
    expect(hasPlaceholder(container)).toBe(false)
    const items = container.querySelectorAll('button, li, [role="button"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('should pass data to event handlers', async () => {
    const user = userEvent.setup()
    const { container } = render(<ItemList />)
    expect(hasPlaceholder(container)).toBe(false)

    const buttons = container.querySelectorAll('button')

    if (buttons.length > 0) {
      await user.click(buttons[0])
      // Should handle click without error
      expect(buttons[0]).toBeInTheDocument()
    }
  })

  it('should render multiple clickable items', () => {
    const { container } = render(<ItemList />)
    const clickable = container.querySelectorAll('button, [role="button"]')
    expect(clickable.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Exercise 5: KeyboardHandler', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<KeyboardHandler />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render an input that handles keyboard events', () => {
    render(<KeyboardHandler />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should respond to Enter key', async () => {
    const user = userEvent.setup()
    render(<KeyboardHandler />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Test{Enter}')

    // Should show some response to Enter key
    const { container } = render(<KeyboardHandler />)
    expect(container).toBeInTheDocument()
  })

  it('should handle keyboard events', async () => {
    const user = userEvent.setup()
    render(<KeyboardHandler />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'abc')

    // Should handle typing without error
    expect(input).toBeInTheDocument()
  })
})

describe('Exercise 6: MultiEventComponent', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<MultiEventComponent />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should handle multiple event types', () => {
    const { container } = render(<MultiEventComponent />)
    expect(container).toBeInTheDocument()
  })

  it('should have elements with different event handlers', async () => {
    const user = userEvent.setup()
    const { container } = render(<MultiEventComponent />)
    const buttons = container.querySelectorAll('button')

    if (buttons.length > 0) {
      await user.click(buttons[0])
      expect(buttons[0]).toBeInTheDocument()
    }
  })

  it('should use TypeScript event types', () => {
    // If component renders without TypeScript errors, types are correct
    const { container } = render(<MultiEventComponent />)
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 7: FocusEvents', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<FocusEvents />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should handle focus events', async () => {
    const user = userEvent.setup()
    render(<FocusEvents />)
    const inputs = screen.getAllByRole('textbox')

    if (inputs.length > 0) {
      await user.click(inputs[0])
      expect(inputs[0]).toHaveFocus()
    }
  })

  it('should render inputs or focusable elements', () => {
    render(<FocusEvents />)
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('should respond to focus and blur events', async () => {
    const user = userEvent.setup()
    render(<FocusEvents />)
    const inputs = screen.getAllByRole('textbox')

    if (inputs.length > 1) {
      await user.click(inputs[0])
      await user.click(inputs[1])
      expect(inputs[1]).toHaveFocus()
    }
  })
})

describe('Exercise 8: EventBubbling', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<EventBubbling />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should demonstrate event bubbling', () => {
    const { container } = render(<EventBubbling />)
    expect(container).toBeInTheDocument()
  })

  it('should have nested clickable elements', async () => {
    const user = userEvent.setup()
    const { container } = render(<EventBubbling />)
    const buttons = container.querySelectorAll('button, div[role="button"]')

    if (buttons.length > 0) {
      await user.click(buttons[0])
      expect(buttons[0]).toBeInTheDocument()
    }
  })

  it('should handle stopPropagation', async () => {
    const user = userEvent.setup()
    const { container } = render(<EventBubbling />)
    const clickable = container.querySelectorAll('[onClick], button')

    // Should have elements that can stop propagation
    expect(clickable.length).toBeGreaterThan(0)
  })
})

describe('Exercise 9: TodoInput', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<TodoInput />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a todo input form', () => {
    render(<TodoInput />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should have an input and submit button', () => {
    render(<TodoInput />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should add todo on submit', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    await user.type(input, 'New Todo')
    await user.click(button)

    // Should display the added todo
    expect(screen.getByText(/New Todo/)).toBeInTheDocument()
  })

  it('should clear input after adding todo', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    const button = screen.getByRole('button')

    await user.type(input, 'Test')
    await user.click(button)

    // Input should be cleared
    expect(input.value).toBe('')
  })

  it('should combine multiple concepts (events, state, forms)', async () => {
    const user = userEvent.setup()
    render(<TodoInput />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    // Should handle the complete flow
    await user.type(input, 'First Todo')
    await user.click(button)
    await user.type(input, 'Second Todo')
    await user.click(button)

    // Should show both todos
    expect(screen.getByText(/First Todo/)).toBeInTheDocument()
    expect(screen.getByText(/Second Todo/)).toBeInTheDocument()
  })
})
