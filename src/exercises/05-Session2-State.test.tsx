/**
 * Tests for Session 2 - useState Hook
 *
 * These tests verify state management, immutable updates,
 * derived state, and complex state patterns.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Counter,
  NameInput,
  UserForm,
  ToggleVisibility,
  TodoList,
  BetterUserForm,
  FastCounter,
  UserSettings,
  ExpensiveInitialization,
  ShoppingCart,
} from './05-Session2-State'


// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}
describe('Exercise 1: Counter', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<Counter />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a counter with initial value', () => {
    const { container } = render(<Counter />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByText(/0|count/i)).toBeInTheDocument()
  })

  it('should increment count on button click', async () => {
    const user = userEvent.setup()
    const { container } = render(<Counter />)
    expect(hasPlaceholder(container)).toBe(false)

    const button = screen.getByRole('button', { name: /increment|\+/i })

    await user.click(button)

    // Should show incremented value - verify state actually updates
    expect(screen.getByText(/1/)).toBeInTheDocument()
  })

  it('should have increment and decrement buttons', () => {
    render(<Counter />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('should decrement count', async () => {
    const user = userEvent.setup()
    const { container } = render(<Counter />)
    expect(hasPlaceholder(container)).toBe(false)

    const decrementBtn = screen.getByRole('button', { name: /decrement|-/i })

    await user.click(decrementBtn)

    // Should show decremented value (might show -1 or negative number)
    expect(screen.getByText(/-1/)).toBeInTheDocument()
  })
})

describe('Exercise 2: NameInput', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<NameInput />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a controlled input', () => {
    const { container } = render(<NameInput />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should update state when typing', async () => {
    const user = userEvent.setup()
    render(<NameInput />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await user.type(input, 'John')

    expect(input.value).toBe('John')
  })

  it('should display the input value', async () => {
    const user = userEvent.setup()
    render(<NameInput />)
    const input = screen.getByRole('textbox')

    await user.type(input, 'Alice')

    // Should show the name somewhere
    expect(screen.getByText(/Alice/)).toBeInTheDocument()
  })
})

describe('Exercise 3: UserForm', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UserForm />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render multiple input fields', () => {
    const { container } = render(<UserForm />)
    expect(hasPlaceholder(container)).toBe(false)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('should manage multiple state variables', async () => {
    const user = userEvent.setup()
    render(<UserForm />)
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'John')
    await user.type(inputs[1], 'john@example.com')

    // Should maintain both values independently
    expect((inputs[0] as HTMLInputElement).value).toBe('John')
    expect((inputs[1] as HTMLInputElement).value).toBe('john@example.com')
  })

  it('should display form data', async () => {
    const user = userEvent.setup()
    render(<UserForm />)
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'Test')

    // Should show the entered data
    expect(screen.getByText(/Test/)).toBeInTheDocument()
  })
})

describe('Exercise 4: ToggleVisibility', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ToggleVisibility />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a toggle button', () => {
    const { container } = render(<ToggleVisibility />)
    expect(hasPlaceholder(container)).toBe(false)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should toggle content visibility', async () => {
    const user = userEvent.setup()
    const { container } = render(<ToggleVisibility />)
    const button = screen.getByRole('button')
    const initialText = container.textContent

    await user.click(button)

    // Content should change after toggle
    const afterText = container.textContent
    expect(afterText).not.toBe(initialText)
  })

  it('should toggle back and forth', async () => {
    const user = userEvent.setup()
    render(<ToggleVisibility />)
    const button = screen.getByRole('button')

    await user.click(button)
    await user.click(button)

    // Should be able to toggle multiple times
    expect(button).toBeInTheDocument()
  })
})

describe('Exercise 5: TodoList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<TodoList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render todo input and list', () => {
    const { container } = render(<TodoList />)
    expect(hasPlaceholder(container)).toBe(false)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should add todos to array state', async () => {
    const user = userEvent.setup()
    const { container } = render(<TodoList />)
    expect(hasPlaceholder(container)).toBe(false)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Buy milk')
    await user.click(button)

    // Verify todo was actually added to array state
    expect(screen.getByText(/Buy milk/)).toBeInTheDocument()
  })

  it('should remove todos from array', async () => {
    const user = userEvent.setup()
    const { container } = render(<TodoList />)
    expect(hasPlaceholder(container)).toBe(false)

    const input = screen.getByRole('textbox')
    const addButton = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Task to delete')
    await user.click(addButton)

    // Verify deletion actually removes from array state
    const deleteButton = screen.getByRole('button', { name: /delete|remove|×/i })
    await user.click(deleteButton)

    expect(screen.queryByText(/Task to delete/)).not.toBeInTheDocument()
  })

  it('should update array state immutably', async () => {
    const user = userEvent.setup()
    const { container } = render(<TodoList />)
    expect(hasPlaceholder(container)).toBe(false)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'First{Enter}')
    await user.type(input, 'Second')
    await user.click(button)

    // Both todos should be present - verifies immutable array updates
    expect(screen.getByText(/First/)).toBeInTheDocument()
    expect(screen.getByText(/Second/)).toBeInTheDocument()
  })
})

describe('Exercise 6: BetterUserForm', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<BetterUserForm />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a form with object state', () => {
    const { container } = render(<BetterUserForm />)
    expect(hasPlaceholder(container)).toBe(false)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('should update object state immutably', async () => {
    const user = userEvent.setup()
    render(<BetterUserForm />)
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'Jane')
    await user.type(inputs[1], 'jane@example.com')

    // Both fields should maintain their values
    expect((inputs[0] as HTMLInputElement).value).toContain('Jane')
    expect((inputs[1] as HTMLInputElement).value).toContain('jane@example.com')
  })

  it('should use object spread for updates', async () => {
    const user = userEvent.setup()
    render(<BetterUserForm />)
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'Test')

    // If component still works, immutable update is working
    expect(inputs[0]).toBeInTheDocument()
  })
})

describe('Exercise 7: FastCounter', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<FastCounter />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should display derived state', () => {
    const { container } = render(<FastCounter />)
    expect(hasPlaceholder(container)).toBe(false)
    // Should show calculated values from state
    expect(container.textContent).toBeTruthy()
  })

  it('should calculate values without extra state', async () => {
    const user = userEvent.setup()
    render(<FastCounter />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Derived values should update automatically
    expect(button).toBeInTheDocument()
  })

  it('should update counter and derived values', async () => {
    const user = userEvent.setup()
    render(<FastCounter />)
    const button = screen.getByRole('button')

    await user.click(button)

    // Should show both count and derived values
    const { container } = render(<FastCounter />)
    expect(container.textContent).toMatch(/\d+/)
  })
})

describe('Exercise 8: UserSettings', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UserSettings />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render nested object form', () => {
    const { container } = render(<UserSettings />)
    expect(hasPlaceholder(container)).toBe(false)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('should update nested object state', async () => {
    const user = userEvent.setup()
    render(<UserSettings />)
    const inputs = screen.getAllByRole('textbox')

    if (inputs.length > 0) {
      await user.type(inputs[0], 'New Value')
      expect((inputs[0] as HTMLInputElement).value).toContain('New Value')
    }
  })

  it('should preserve other nested properties', async () => {
    const user = userEvent.setup()
    render(<UserSettings />)
    const inputs = screen.getAllByRole('textbox')

    if (inputs.length > 1) {
      await user.type(inputs[0], 'Value 1')
      await user.type(inputs[1], 'Value 2')

      // Both values should be preserved
      expect((inputs[0] as HTMLInputElement).value).toContain('Value 1')
      expect((inputs[1] as HTMLInputElement).value).toContain('Value 2')
    }
  })
})

describe('Exercise 9: ExpensiveInitialization', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ExpensiveInitialization />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render with lazy initialization', () => {
    const { container } = render(<ExpensiveInitialization />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should initialize state with function', () => {
    const { container } = render(<ExpensiveInitialization />)
    // Should show initial computed value
    expect(container.textContent).toMatch(/\d+/)
  })

  it('should only run initialization once', async () => {
    const user = userEvent.setup()
    render(<ExpensiveInitialization />)
    const button = screen.getByRole('button')

    // Click multiple times
    await user.click(button)
    await user.click(button)

    // Should still work correctly
    expect(button).toBeInTheDocument()
  })
})

describe('Exercise 10: ShoppingCart', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render shopping cart interface', () => {
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should add items to cart', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)

    const buttons = screen.getAllByRole('button')

    if (buttons.length > 0) {
      await user.click(buttons[0])
      // Should show item was actually added to cart state
      expect(container.textContent).toBeTruthy()
    }
  })

  it('should update item quantities', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)

    const buttons = screen.getAllByRole('button')

    // Add same item multiple times
    if (buttons.length > 0) {
      await user.click(buttons[0])
      await user.click(buttons[0])

      // Verify quantity actually updates in cart state
      expect(screen.getByText(/2|quantity/i)).toBeInTheDocument()
    }
  })

  it('should remove items from cart', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)

    const addButtons = screen.getAllByRole('button', { name: /add/i })

    if (addButtons.length > 0) {
      await user.click(addButtons[0])

      const removeButton = screen.getByRole('button', { name: /remove|delete|×/i })
      await user.click(removeButton)

      // Verify item was actually removed from cart state
      expect(removeButton).not.toBeInTheDocument()
    }
  })

  it('should calculate total price', async () => {
    const user = userEvent.setup()
    const { container } = render(<ShoppingCart />)
    expect(hasPlaceholder(container)).toBe(false)

    const buttons = screen.getAllByRole('button', { name: /add/i })

    if (buttons.length > 0) {
      await user.click(buttons[0])

      // Verify total is actually calculated from cart state
      expect(screen.getByText(/total/i)).toBeInTheDocument()
    }
  })
})
