/**
 * Progress Tracker Component
 * Sidebar navigation with exercise progress tracking
 */

import { useState } from 'react'
import {
  exerciseConfig,
  type ExerciseSection,
  getAllExercises,
} from '../exerciseConfig'

interface ProgressTrackerProps {
  currentExerciseId: string | null
  onExerciseSelect: (exerciseId: string) => void
  completedExercises: Set<string>
  onToggleComplete: (exerciseId: string) => void
}

export function ProgressTracker({
  currentExerciseId,
  onExerciseSelect,
  completedExercises,
  onToggleComplete,
}: ProgressTrackerProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const getSectionProgress = (section: ExerciseSection) => {
    const completed = section.exercises.filter((ex) => completedExercises.has(ex.id)).length
    const total = section.exercises.length
    return { completed, total }
  }

  const getTotalProgress = () => {
    const allExercises = getAllExercises()
    const completed = allExercises.filter((ex) => completedExercises.has(ex.id)).length
    return { completed, total: allExercises.length }
  }

  const totalProgress = getTotalProgress()
  const progressPercentage = Math.round((totalProgress.completed / totalProgress.total) * 100)

  return (
    <div
      style={{
        width: '280px',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #e0e0e0',
        padding: '1rem',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          📚 Progress
        </h2>
        <div
          style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.5rem',
          }}
        >
          {totalProgress.completed} / {totalProgress.total} exercises
        </div>
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: '#4caf50',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
          {progressPercentage}% complete
        </div>
      </div>

      {/* Session Groups */}
      {exerciseConfig.map((section) => {
        const { completed, total } = getSectionProgress(section)
        const isCollapsed = collapsedSections.has(section.id)
        const allCompleted = completed === total

        return (
          <div key={section.id} style={{ marginBottom: '1rem' }}>
            {/* Section Header */}
            <div
              onClick={() => toggleSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem',
                cursor: 'pointer',
                backgroundColor: allCompleted ? '#e8f5e9' : '#fff',
                borderRadius: '4px',
                marginBottom: '0.25rem',
                border: '1px solid #e0e0e0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem' }}>{isCollapsed ? '▶' : '▼'}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                  {section.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: allCompleted ? '#4caf50' : '#666',
                  fontWeight: allCompleted ? 'bold' : 'normal',
                }}
              >
                {completed}/{total}
              </span>
            </div>

            {/* Exercise List */}
            {!isCollapsed && (
              <div style={{ paddingLeft: '0.5rem' }}>
                {section.exercises.map((exercise) => {
                  const isCompleted = completedExercises.has(exercise.id)
                  const isCurrent = currentExerciseId === exercise.id

                  return (
                    <div
                      key={exercise.id}
                      onClick={() => onExerciseSelect(exercise.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        backgroundColor: isCurrent ? '#e3f2fd' : 'transparent',
                        borderRadius: '4px',
                        marginBottom: '0.25rem',
                        border: isCurrent ? '1px solid #2196f3' : '1px solid transparent',
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{isCompleted ? '✅' : '⬜'}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '0.875rem',
                            color: isCompleted ? '#888' : '#333',
                            textDecoration: isCompleted ? 'line-through' : 'none',
                          }}
                        >
                          {exercise.title}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {/* Reset Button */}
      <button
        onClick={() => {
          if (window.confirm('Reset all progress? This cannot be undone.')) {
            completedExercises.forEach((id) => onToggleComplete(id))
          }
        }}
        style={{
          width: '100%',
          padding: '0.5rem',
          marginTop: '1rem',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Reset Progress
      </button>
    </div>
  )
}
