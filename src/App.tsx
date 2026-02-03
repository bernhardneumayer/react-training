/**
 * React Training - Interactive Exercise Tracker
 *
 * Features:
 * - Sidebar navigation with progress tracking
 * - localStorage persistence
 * - Mark complete / Next exercise buttons
 * - Collapsible sessions
 */

import { useState, useEffect } from 'react'
import { ProgressTracker } from './components/ProgressTracker'
import { TestResults } from './components/TestResults'
import { getExerciseById, getAllExercises } from './exerciseConfig'
import { loadProgress, saveProgress } from './utils/progressStorage'

type TabView = 'exercise' | 'tests'

function App() {
  const [activeTab, setActiveTab] = useState<TabView>('exercise')

  // Load progress from localStorage on mount
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(() => loadProgress())
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(() => {
    // Start with first incomplete exercise, or first exercise if all complete
    const allExercises = getAllExercises()
    const firstIncomplete = allExercises.find((ex) => !loadProgress().has(ex.id))
    return firstIncomplete?.id || allExercises[0]?.id || null
  })

  // Save to localStorage whenever completedExercises changes
  useEffect(() => {
    saveProgress(completedExercises)
  }, [completedExercises])

  const currentExercise = currentExerciseId ? getExerciseById(currentExerciseId) : null

  const toggleComplete = (exerciseId: string) => {
    setCompletedExercises((prev) => {
      const next = new Set(prev)
      if (next.has(exerciseId)) {
        next.delete(exerciseId)
      } else {
        next.add(exerciseId)
      }
      return next
    })
  }

  const handleMarkComplete = () => {
    if (!currentExerciseId) return
    toggleComplete(currentExerciseId)
  }

  const handleNextExercise = () => {
    const allExercises = getAllExercises()
    const currentIndex = allExercises.findIndex((ex) => ex.id === currentExerciseId)

    // Find next incomplete exercise
    for (let i = currentIndex + 1; i < allExercises.length; i++) {
      if (!completedExercises.has(allExercises[i].id)) {
        setCurrentExerciseId(allExercises[i].id)
        return
      }
    }

    // If no incomplete found after current, wrap to beginning
    for (let i = 0; i < currentIndex; i++) {
      if (!completedExercises.has(allExercises[i].id)) {
        setCurrentExerciseId(allExercises[i].id)
        return
      }
    }

    // If all complete, just go to next exercise (or wrap to first)
    const nextIndex = (currentIndex + 1) % allExercises.length
    setCurrentExerciseId(allExercises[nextIndex].id)
  }

  const isCurrentComplete = currentExerciseId ? completedExercises.has(currentExerciseId) : false

  // Get file path for current exercise
  const getExerciseFilePath = (exerciseId: string): string => {
    const sectionMap: { [key: string]: string } = {
      'jsx-': '01-Session1-JSX.tsx',
      'props-': '02-Session1-Props.tsx',
      'lists-': '03-Session1-Lists.tsx',
      'events-': '04-Session1-Events.tsx',
      'state-': '05-Session2-State.tsx',
      'effects-': '06-Session2-Effects.tsx',
      'refs-': '07-Session2-Refs.tsx',
    }

    for (const [prefix, file] of Object.entries(sectionMap)) {
      if (exerciseId.startsWith(prefix)) {
        return `src/exercises/${file}`
      }
    }
    return 'src/exercises/'
  }

  const currentFilePath = currentExerciseId ? getExerciseFilePath(currentExerciseId) : ''

  // Extract exercise number from ID (e.g., "jsx-1" -> "Exercise 1")
  const getExerciseNumber = (exerciseId: string): string => {
    const match = exerciseId.match(/-(\d+)$/)
    return match ? `Exercise ${match[1]}` : ''
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <ProgressTracker
        currentExerciseId={currentExerciseId}
        onExerciseSelect={setCurrentExerciseId}
        completedExercises={completedExercises}
        onToggleComplete={toggleComplete}
      />

      {/* Main Content */}
      <div
        style={{
          marginLeft: '320px',
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentExercise ? (
          <div style={{ maxWidth: '900px', minWidth: '700px', width: '100%' }}>
            {/* Exercise Header */}
            <div
              style={{
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #e0e0e0',
              }}
            >
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem', fontWeight: 'bold' }}>
                {getExerciseNumber(currentExerciseId)}
              </div>
              <h1 style={{ margin: 0, marginBottom: '0.5rem' }}>
                {currentExercise.title}
              </h1>

              {/* File Path - Prominent Display */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#2196f3' }}>📂 Open file:</span>
                <code style={{ color: '#333', fontSize: '0.9rem' }}>{currentFilePath}</code>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#666',
                }}
              >
                {isCurrentComplete && (
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                    }}
                  >
                    ✓ Completed
                  </span>
                )}
              </div>
              {currentExercise.instructions && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: '#f0f7ff',
                    borderLeft: '3px solid #2196f3',
                    fontSize: '0.875rem',
                  }}
                >
                  <strong>Instructions:</strong> {currentExercise.instructions}
                </div>
              )}
            </div>

            {/* Tab Navigation */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                borderBottom: '2px solid #e0e0e0',
              }}
            >
              <button
                onClick={() => setActiveTab('exercise')}
                style={{
                  padding: '0.75rem 1.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: 'transparent',
                  color: activeTab === 'exercise' ? '#2196f3' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === 'exercise' ? 'bold' : 'normal',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                📝 Exercise
                {activeTab === 'exercise' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0.5rem',
                      right: '0.5rem',
                      height: '2px',
                      backgroundColor: '#2196f3',
                    }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('tests')}
                style={{
                  padding: '0.75rem 1.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: 'transparent',
                  color: activeTab === 'tests' ? '#2196f3' : '#666',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === 'tests' ? 'bold' : 'normal',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                🧪 Test Results
                {activeTab === 'tests' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0.5rem',
                      right: '0.5rem',
                      height: '2px',
                      backgroundColor: '#2196f3',
                    }}
                  />
                )}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'exercise' ? (
              <>
                {/* Exercise Component */}
                <div
              style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                minHeight: '300px',
              }}
            >
              <currentExercise.component />
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e0e0e0',
              }}
            >
              <button
                onClick={handleMarkComplete}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isCurrentComplete ? '#ff9800' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {isCurrentComplete ? '↺ Mark Incomplete' : '✓ Mark Complete'}
              </button>
              <button
                onClick={handleNextExercise}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Next Exercise →
              </button>
            </div>

            {/* Tips */}
            <details
              style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                💡 Tips
              </summary>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Open the exercise file in IntelliJ IDEA to work on it</li>
                <li>Look for TODO comments in the code</li>
                <li>Save your changes and check this view</li>
                <li>Mark complete when you're satisfied with your solution</li>
                <li>
                  Compare with solutions in <code>src/solutions/</code>
                </li>
              </ul>
            </details>
              </>
            ) : (
              /* Test Results Tab */
              <div
                style={{
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  minHeight: '300px',
                }}
              >
                <TestResults currentExerciseId={currentExerciseId} />
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              marginTop: '4rem',
              color: '#666',
            }}
          >
            <h2>No exercise selected</h2>
            <p>Select an exercise from the sidebar to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
