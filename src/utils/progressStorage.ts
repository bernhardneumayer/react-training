/**
 * Progress Storage Utility
 * Handles localStorage persistence for exercise progress
 */

const STORAGE_KEY = 'react-training-progress'

export interface ProgressData {
  completedExercises: string[]
  lastUpdated: string
}

/**
 * Load progress from localStorage
 */
export const loadProgress = (): Set<string> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return new Set()

    const data: ProgressData = JSON.parse(stored)
    return new Set(data.completedExercises)
  } catch (error) {
    console.error('Failed to load progress:', error)
    return new Set()
  }
}

/**
 * Save progress to localStorage
 */
export const saveProgress = (completedExercises: Set<string>): void => {
  try {
    const data: ProgressData = {
      completedExercises: Array.from(completedExercises),
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

/**
 * Clear all progress
 */
export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear progress:', error)
  }
}

/**
 * Export progress as JSON file
 */
export const exportProgress = (): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      alert('No progress to export')
      return
    }

    const blob = new Blob([stored], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `react-training-progress-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export progress:', error)
    alert('Failed to export progress')
  }
}

/**
 * Import progress from JSON file
 */
export const importProgress = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const data: ProgressData = JSON.parse(content)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        resolve()
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
