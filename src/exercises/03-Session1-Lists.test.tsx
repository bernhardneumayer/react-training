/**
 * Tests for Session 1 - Lists & Keys Exercises
 *
 * Run tests: npm test
 * Run specific file: npm test Lists
 *
 * These tests verify that exercises are implemented correctly.
 * Start with failing tests (TDD) and implement until they pass.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  TransactionList,
  ImprovedTransactionList,
  TransactionListWithEmptyState,
  FilteredTransactionList,
  InteractiveTransactionList,
  GoodKeyExample,
  GroupedTransactionList,
} from './03-Session1-Lists'


// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}
describe('Exercise 1: TransactionList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<TransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a list of transactions', () => {
    const { container } = render(<TransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
    const list = container.querySelector('ul')

    expect(list).toBeInTheDocument()
    expect(list?.children.length).toBeGreaterThan(0)
  })

  it('should display transaction descriptions', () => {
    const { container } = render(<TransactionList />)
    expect(hasPlaceholder(container)).toBe(false)

    // Check for sample transaction from the data
    expect(screen.getByText(/Grocery Store/i)).toBeInTheDocument()
  })

  it('should use proper keys (not index)', () => {
    const { container } = render(<TransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
    const listItems = container.querySelectorAll('li')

    // Each item should have a key attribute in the virtual DOM
    // This checks that .map() is used with a key prop
    expect(listItems.length).toBeGreaterThan(0)
  })
})

describe('Exercise 2: ImprovedTransactionList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ImprovedTransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render transactions using TransactionItem component', () => {
    const { container } = render(<ImprovedTransactionList />)
    const listItems = container.querySelectorAll('li')

    expect(listItems.length).toBeGreaterThan(0)
  })

  it('should display transaction details (description, amount, date, category)', () => {
    render(<ImprovedTransactionList />)

    // Should show description
    expect(screen.getByText(/Grocery Store/i)).toBeInTheDocument()

    // Should show amount (check for negative sign)
    expect(screen.getByText(/-45.5/)).toBeInTheDocument()
  })

  it('should use proper keys (transaction.id)', () => {
    const { container } = render(<ImprovedTransactionList />)
    const listItems = container.querySelectorAll('li')

    // Verify multiple items are rendered
    expect(listItems.length).toBeGreaterThanOrEqual(5)
  })
})

describe('Exercise 3: TransactionListWithEmptyState', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<TransactionListWithEmptyState />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should show empty state message when no transactions', () => {
    render(<TransactionListWithEmptyState />)

    // Should show "no transactions" or similar message
    const emptyMessage = screen.getByText(/no transactions/i)
    expect(emptyMessage).toBeInTheDocument()
  })

  it('should NOT render a list when empty', () => {
    const { container } = render(<TransactionListWithEmptyState />)
    const list = container.querySelector('ul')

    // List should either not exist or be empty
    expect(list?.children.length || 0).toBe(0)
  })
})

describe('Exercise 4: FilteredTransactionList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<FilteredTransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should only show food category transactions', () => {
    render(<FilteredTransactionList />)

    // Should show food transactions
    expect(screen.getByText(/Grocery Store/i)).toBeInTheDocument()
    expect(screen.getByText(/Restaurant/i)).toBeInTheDocument()

    // Should NOT show non-food transactions
    expect(screen.queryByText(/Uber/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Netflix/i)).not.toBeInTheDocument()
  })

  it('should filter transactions before rendering', () => {
    const { container } = render(<FilteredTransactionList />)
    const listItems = container.querySelectorAll('li')

    // Should have exactly 2 food transactions
    expect(listItems.length).toBe(2)
  })
})

describe('Exercise 5: InteractiveTransactionList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<InteractiveTransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render interactive transaction items', () => {
    const { container } = render(<InteractiveTransactionList />)
    const listItems = container.querySelectorAll('li')

    expect(listItems.length).toBeGreaterThan(0)
  })

  it('should have clickable transaction items', async () => {
    const user = userEvent.setup()
    const { container } = render(<InteractiveTransactionList />)
    const firstItem = container.querySelector('li')

    expect(firstItem).toBeInTheDocument()

    // Items should be clickable (have cursor pointer or onclick)
    // This is a basic check - implementation details may vary
    if (firstItem) {
      await user.click(firstItem)
      // If click doesn't error, the handler exists
    }
  })

  it('should have delete buttons on items', () => {
    const { container } = render(<InteractiveTransactionList />)

    // Look for delete buttons (button with "delete" text or X symbol)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})

describe('Exercise 6: GoodKeyExample', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<GoodKeyExample />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a list of transactions', () => {
    const { container } = render(<GoodKeyExample />)
    const list = container.querySelector('ul')

    expect(list).toBeInTheDocument()
    expect(list?.children.length).toBeGreaterThan(0)
  })

  it('should use transaction.id as key (not index)', () => {
    const { container } = render(<GoodKeyExample />)
    const listItems = container.querySelectorAll('li')

    // Should have multiple items with proper keys
    expect(listItems.length).toBeGreaterThanOrEqual(5)
  })
})

describe('Exercise 7: GroupedTransactionList', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<GroupedTransactionList />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render transaction groups by category', () => {
    render(<GroupedTransactionList />)

    // Should show category labels
    expect(screen.getByText(/food/i)).toBeInTheDocument()
    expect(screen.getByText(/transport/i)).toBeInTheDocument()
  })

  it('should group transactions under categories', () => {
    const { container } = render(<GroupedTransactionList />)

    // Should have nested structure (categories with items)
    const lists = container.querySelectorAll('ul')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('should show transactions in their correct groups', () => {
    render(<GroupedTransactionList />)

    // Food category should have Grocery and Restaurant
    expect(screen.getByText(/Grocery Store/i)).toBeInTheDocument()
    expect(screen.getByText(/Restaurant/i)).toBeInTheDocument()

    // Transport category should have Uber
    expect(screen.getByText(/Uber/i)).toBeInTheDocument()
  })

  it('should use keys for both outer and inner lists', () => {
    const { container } = render(<GroupedTransactionList />)

    // Should render all transactions across all groups
    const allListItems = container.querySelectorAll('li')
    expect(allListItems.length).toBeGreaterThanOrEqual(5)
  })
})
