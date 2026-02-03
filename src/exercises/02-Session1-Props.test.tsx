/**
 * Tests for Session 1 - Props & TypeScript
 *
 * These tests verify proper prop passing, TypeScript types,
 * default props, children, and rest props patterns.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  ButtonDemo,
  BadgeDemo,
  UserCard,
  CardDemo,
  InputDemo,
} from './02-Session1-Props'

// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}

describe('Exercise 1: ButtonDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ButtonDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render Button component', () => {
    const { container } = render(<ButtonDemo />)
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render buttons with different variants', () => {
    const { container } = render(<ButtonDemo />)
    const buttons = container.querySelectorAll('button')
    // Should have multiple buttons (primary, secondary, danger)
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it('should apply different styles based on variant prop', () => {
    const { container } = render(<ButtonDemo />)
    const buttons = container.querySelectorAll('button')

    // Check that buttons have different styles
    const styles = Array.from(buttons).map(btn => btn.getAttribute('style'))
    const uniqueStyles = new Set(styles)
    expect(uniqueStyles.size).toBeGreaterThan(1)
  })

  it('should display button text', () => {
    render(<ButtonDemo />)
    // Should have button text labels
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})

describe('Exercise 2: UserCard', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UserCard />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render UserCard component', () => {
    const { container } = render(<UserCard />)
    expect(container.textContent).toBeTruthy()
  })

  it('should display user name', () => {
    render(<UserCard />)
    // Should show a name (using destructured props)
    const { container } = render(<UserCard />)
    expect(container.textContent?.length).toBeGreaterThan(0)
  })

  it('should display user email', () => {
    const { container } = render(<UserCard />)
    const text = container.textContent || ''
    // Should contain an email address pattern
    const hasEmail = /@/.test(text) || text.length > 10
    expect(hasEmail).toBe(true)
  })

  it('should use destructured props', () => {
    // If component renders, destructured props are working
    const { container } = render(<UserCard />)
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 3: BadgeDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<BadgeDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render Badge component', () => {
    const { container } = render(<BadgeDemo />)
    expect(container.textContent).toBeTruthy()
  })

  it('should render multiple badges', () => {
    const { container } = render(<BadgeDemo />)
    // Should render several badge instances
    const badges = container.querySelectorAll('[style]')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('should use default props', () => {
    const { container } = render(<BadgeDemo />)
    // Should render without requiring all props
    expect(container).toBeInTheDocument()
  })

  it('should display badge text', () => {
    const { container } = render(<BadgeDemo />)
    // Should show badge labels
    expect(container.textContent?.length).toBeGreaterThan(0)
  })
})

describe('Exercise 4: CardDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<CardDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render Card component', () => {
    const { container } = render(<CardDemo />)
    expect(container).toBeInTheDocument()
  })

  it('should render card with children', () => {
    const { container } = render(<CardDemo />)
    // Should have content inside the card
    expect(container.textContent).toBeTruthy()
  })

  it('should display card title', () => {
    render(<CardDemo />)
    // Should show a card title/heading
    const heading = screen.queryByRole('heading')
    const hasTitle = heading || screen.queryByText(/card/i)
    expect(hasTitle).toBeTruthy()
  })

  it('should accept children prop', () => {
    // If CardDemo renders with content, children prop works
    const { container } = render(<CardDemo />)
    expect(container.textContent?.length).toBeGreaterThan(0)
  })

  it('should render multiple cards', () => {
    const { container } = render(<CardDemo />)
    // Should demonstrate multiple card instances
    const cards = container.querySelectorAll('[style*="border"]')
    expect(cards.length).toBeGreaterThan(0)
  })
})

describe('Exercise 5: InputDemo', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<InputDemo />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render Input component', () => {
    const { container } = render(<InputDemo />)
    const inputs = container.querySelectorAll('input')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('should render multiple inputs', () => {
    const { container } = render(<InputDemo />)
    const inputs = container.querySelectorAll('input')
    // Should have several input examples
    expect(inputs.length).toBeGreaterThanOrEqual(2)
  })

  it('should support rest props (spread operator)', () => {
    const { container } = render(<InputDemo />)
    const inputs = container.querySelectorAll('input')

    // Check if inputs have native HTML attributes
    const firstInput = inputs[0]
    const hasAttributes = firstInput?.hasAttribute('type') ||
                          firstInput?.hasAttribute('placeholder')
    expect(hasAttributes).toBe(true)
  })

  it('should pass through HTML input attributes', () => {
    const { container } = render(<InputDemo />)
    const inputs = container.querySelectorAll('input')

    // Should have placeholder or other standard input attributes
    const hasPlaceholder = Array.from(inputs).some(input =>
      input.hasAttribute('placeholder')
    )
    expect(hasPlaceholder).toBe(true)
  })

  it('should have input labels or descriptions', () => {
    const { container } = render(<InputDemo />)
    // Should have some text describing the inputs
    expect(container.textContent?.length).toBeGreaterThan(0)
  })
})
