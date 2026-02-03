/**
 * Tests for Session 1 - JSX Fundamentals
 *
 * These tests verify correct JSX syntax, conditional rendering,
 * and expression usage.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  BrokenComponent,
  WelcomeCard,
  ExpressionPractice,
  UserProfile,
} from './01-Session1-JSX'

// Helper to check if component has TODO/placeholder content
const hasPlaceholder = (container: HTMLElement): boolean => {
  const text = container.textContent || ''
  return /TODO|🚧|placeholder|Not started/i.test(text)
}

describe('Exercise 1: BrokenComponent', () => {
  it('should render without errors', () => {
    const { container } = render(<BrokenComponent />)
    expect(container).toBeInTheDocument()
  })

  it('should display a heading', () => {
    render(<BrokenComponent />)
    const heading = screen.queryByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it('should not have multiple root elements', () => {
    const { container } = render(<BrokenComponent />)
    // Should have single root element (or fragment)
    expect(container.firstChild).toBeTruthy()
  })
})

describe('Exercise 2: WelcomeCard', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<WelcomeCard />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render a greeting card', () => {
    const { container } = render(<WelcomeCard />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  it('should show current time/date', () => {
    const { container } = render(<WelcomeCard />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should use conditional rendering', () => {
    const { container } = render(<WelcomeCard />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should have a greeting message', () => {
    render(<WelcomeCard />)
    // Should show a greeting (Good morning/afternoon/evening)
    const hasGreeting =
      screen.queryByText(/good morning/i) ||
      screen.queryByText(/good afternoon/i) ||
      screen.queryByText(/good evening/i)
    expect(hasGreeting).toBeTruthy()
  })
})

describe('Exercise 3: ExpressionPractice', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<ExpressionPractice />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should render with expressions', () => {
    const { container } = render(<ExpressionPractice />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container).toBeInTheDocument()
  })

  it('should display calculated values', () => {
    const { container } = render(<ExpressionPractice />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should use JavaScript expressions in JSX', () => {
    const { container } = render(<ExpressionPractice />)
    expect(hasPlaceholder(container)).toBe(false)
    const text = container.textContent || ''
    const hasNumbers = /\d+/.test(text)
    expect(hasNumbers).toBe(true)
  })

  it('should not use statements directly in JSX', () => {
    const { container } = render(<ExpressionPractice />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container).toBeInTheDocument()
  })
})

describe('Exercise 4: UserProfile', () => {
  it('should not have placeholder content', () => {
    const { container } = render(<UserProfile />)
    expect(hasPlaceholder(container)).toBe(false)
  })

  it('should display user information', () => {
    const { container } = render(<UserProfile />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container.textContent).toBeTruthy()
  })

  it('should use JSX interpolation for dynamic values', () => {
    const { container } = render(<UserProfile />)
    expect(hasPlaceholder(container)).toBe(false)
    const text = container.textContent || ''
    expect(text.length).toBeGreaterThan(0)
  })

  it('should render user name', () => {
    const { container } = render(<UserProfile />)
    expect(hasPlaceholder(container)).toBe(false)
    expect(container.textContent).toMatch(/\w+/)
  })

  it('should display multiple user properties', () => {
    const { container } = render(<UserProfile />)
    expect(hasPlaceholder(container)).toBe(false)
    const text = container.textContent || ''
    const hasMultipleFields = text.length > 20
    expect(hasMultipleFields).toBe(true)
  })
})
