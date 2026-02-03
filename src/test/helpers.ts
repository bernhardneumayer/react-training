/**
 * Test helper functions
 */

/**
 * Check if a component contains TODO/placeholder text
 * Returns true if component is NOT yet implemented (has TODO markers)
 */
export function hasPlaceholderContent(container: HTMLElement): boolean {
  const text = container.textContent || ''
  return (
    text.includes('TODO') ||
    text.includes('🚧') ||
    text.includes('placeholder') ||
    text.includes('Open exercise file to implement') ||
    text.includes('Not started') ||
    text.includes('Implement')
  )
}

/**
 * Check if a component is properly implemented (no TODO markers)
 */
export function isImplemented(container: HTMLElement): boolean {
  return !hasPlaceholderContent(container)
}
