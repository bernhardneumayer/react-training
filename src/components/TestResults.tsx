/**
 * Test Results Component
 * Displays live test results in the UI
 */

import { useState, useEffect } from 'react'
import { getExerciseById } from '../exerciseConfig'

interface VitestAssertion {
  ancestorTitles: string[]
  fullName: string
  status: 'passed' | 'failed' | 'skipped'
  title: string
  duration: number
  failureMessages: string[]
}

interface VitestTestResult {
  assertionResults: VitestAssertion[]
  name: string
  status: string
  startTime: number
  endTime: number
}

interface VitestData {
  numTotalTests: number
  numPassedTests: number
  numFailedTests: number
  numPendingTests: number
  startTime: number
  testResults: VitestTestResult[]
}

interface ProcessedTest {
  name: string
  status: 'pass' | 'fail' | 'skip'
  duration: number
  error?: string
}

interface ProcessedSuite {
  file: string
  tests: ProcessedTest[]
  passCount: number
  failCount: number
  skipCount: number
}

interface TestResultsProps {
  currentExerciseId?: string | null
}

export function TestResults({ currentExerciseId }: TestResultsProps) {
  const [vitestData, setVitestData] = useState<VitestData | null>(null)
  const [suites, setSuites] = useState<ProcessedSuite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set())
  const [testRunning, setTestRunning] = useState(false)

  useEffect(() => {
    loadTestResults()
    // Poll for updates every 3 seconds
    const interval = setInterval(loadTestResults, 3000)
    return () => clearInterval(interval)
  }, [])

  const loadTestResults = async () => {
    try {
      const response = await fetch('/test-results.json')
      if (!response.ok) {
        throw new Error('Test results not found. Run "npm test -- --run" first.')
      }
      const data: VitestData = await response.json()
      setVitestData(data)

      // Process into suites
      const processed = data.testResults.map(result => ({
        file: result.name,
        tests: result.assertionResults.map(assertion => ({
          name: assertion.fullName,
          status: assertion.status === 'passed' ? 'pass' as const :
                  assertion.status === 'skipped' ? 'skip' as const : 'fail' as const,
          duration: assertion.duration,
          error: assertion.failureMessages[0],
        })),
        passCount: result.assertionResults.filter(a => a.status === 'passed').length,
        failCount: result.assertionResults.filter(a => a.status === 'failed').length,
        skipCount: result.assertionResults.filter(a => a.status === 'skipped').length,
      }))

      setSuites(processed)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load test results')
    } finally {
      setLoading(false)
    }
  }

  const runTests = async (testFile?: string, exerciseNumber?: string) => {
    const startTime = Date.now()
    console.log(`🧪 Starting tests... ${testFile ? `${testFile} Exercise ${exerciseNumber || 'All'}` : 'All'}`)
    try {
      setTestRunning(true)
      const response = await fetch('http://localhost:3001/api/run-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testFile, exerciseNumber }),
      })

      if (!response.ok) {
        const data = await response.json()
        if (response.status === 409) {
          alert('Tests are already running')
        } else {
          throw new Error('Failed to start tests')
        }
      }

      // Poll for completion - check every 200ms for faster feedback
      const checkInterval = setInterval(async () => {
        try {
          const statusRes = await fetch('http://localhost:3001/api/test-status')
          const status = await statusRes.json()
          if (!status.running) {
            setTestRunning(false)
            clearInterval(checkInterval)
            // Force immediate refresh
            await loadTestResults()
            const duration = ((Date.now() - startTime) / 1000).toFixed(1)
            console.log(`✅ Tests completed in ${duration}s (UI updated)`)
          }
        } catch (err) {
          // Server might not be running
          setTestRunning(false)
          clearInterval(checkInterval)
        }
      }, 200)

      // Timeout after 2 minutes
      setTimeout(() => {
        clearInterval(checkInterval)
        setTestRunning(false)
      }, 120000)

    } catch (err) {
      setTestRunning(false)
      alert('Failed to run tests. Make sure the test server is running with "npm run dev:full"')
    }
  }

  const toggleSuite = (fileName: string) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev)
      if (next.has(fileName)) {
        next.delete(fileName)
      } else {
        next.add(fileName)
      }
      return next
    })
  }

  const getFileNameFromPath = (path: string) => {
    return path.split('/').pop()?.replace('.test.tsx', '') || path
  }

  const getTestFileFromExerciseId = (exerciseId: string): string | null => {
    const sectionMap: { [key: string]: string } = {
      'jsx-': '01-Session1-JSX.test.tsx',
      'props-': '02-Session1-Props.test.tsx',
      'lists-': '03-Session1-Lists.test.tsx',
      'events-': '04-Session1-Events.test.tsx',
      'state-': '05-Session2-State.test.tsx',
      'effects-': '06-Session2-Effects.test.tsx',
      'refs-': '07-Session2-Refs.test.tsx',
    }

    for (const [prefix, file] of Object.entries(sectionMap)) {
      if (exerciseId.startsWith(prefix)) {
        return file
      }
    }
    return null
  }

  // Get exercise number from ID (e.g., "lists-1" -> "1")
  const getExerciseNumber = (exerciseId: string): string | null => {
    const match = exerciseId.match(/-(\d+)$/)
    return match ? match[1] : null
  }

  // Filter suites and tests based on current exercise
  const filteredSuites = currentExerciseId
    ? suites
        .filter((suite) => {
          const expectedFile = getTestFileFromExerciseId(currentExerciseId)
          if (!expectedFile) return true // Show all if can't determine
          return suite.file.includes(expectedFile)
        })
        .map((suite) => {
          // Further filter tests to match exercise number
          const exerciseNum = getExerciseNumber(currentExerciseId)
          if (!exerciseNum) return suite

          const filteredTests = suite.tests.filter((test) => {
            // Check if test name includes "Exercise N:"
            const testExerciseMatch = test.name.match(/Exercise (\d+):/)
            return testExerciseMatch && testExerciseMatch[1] === exerciseNum
          })

          return {
            ...suite,
            tests: filteredTests,
            passCount: filteredTests.filter((t) => t.status === 'pass').length,
            failCount: filteredTests.filter((t) => t.status === 'fail').length,
            skipCount: filteredTests.filter((t) => t.status === 'skip').length,
          }
        })
        .filter((suite) => suite.tests.length > 0) // Remove suites with no matching tests
    : suites

  const getStatusColor = (status: 'pass' | 'fail' | 'skip') => {
    switch (status) {
      case 'pass':
        return '#4caf50'
      case 'fail':
        return '#f44336'
      case 'skip':
        return '#ff9800'
    }
  }

  const stripAnsiCodes = (text: string): string => {
    // Remove ANSI escape codes (colors, formatting, etc.)
    return text.replace(/\x1b\[[0-9;]*m/g, '')
  }

  if (loading) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p>Loading test results...</p>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Run <code>npm test</code> to generate results
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>⚠️ No test results available</p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>{error}</p>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
          Run: <code>npm test -- --run</code>
        </p>
      </div>
    )
  }

  if (!vitestData) {
    return null
  }

  // Calculate stats for filtered tests
  const filteredStats = {
    totalTests: filteredSuites.reduce((sum, s) => sum + s.tests.length, 0),
    totalPass: filteredSuites.reduce((sum, s) => sum + s.passCount, 0),
    totalFail: filteredSuites.reduce((sum, s) => sum + s.failCount, 0),
    totalSkip: filteredSuites.reduce((sum, s) => sum + s.skipCount, 0),
  }

  const progressPercentage = filteredStats.totalTests > 0
    ? Math.round((filteredStats.totalPass / filteredStats.totalTests) * 100)
    : 0

  return (
    <div style={{
      padding: '1rem',
      maxHeight: '70vh',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {/* Summary */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          flexShrink: 0, // Keep summary visible
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0' }}>🧪 Test Results</h3>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
          Last updated: {new Date(vitestData.startTime).toLocaleTimeString()}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '24px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: '#4caf50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              transition: 'width 0.3s ease',
            }}
          >
            {progressPercentage}%
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: '#4caf50' }}>✓ {filteredStats.totalPass} passed</span>
          <span style={{ color: '#f44336' }}>✗ {filteredStats.totalFail} failed</span>
          {filteredStats.totalSkip > 0 && (
            <span style={{ color: '#ff9800' }}>⊘ {filteredStats.totalSkip} skipped</span>
          )}
          <span style={{ color: '#666' }}>Total: {filteredStats.totalTests}</span>

          {/* Test run buttons */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {currentExerciseId && (
              <button
                onClick={() => {
                  const testFile = getTestFileFromExerciseId(currentExerciseId)
                  const exerciseNum = getExerciseNumber(currentExerciseId)
                  if (testFile && exerciseNum) {
                    runTests(testFile, exerciseNum)
                  }
                }}
                disabled={testRunning}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: testRunning ? '#9e9e9e' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: testRunning ? 'not-allowed' : 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                title="Run tests for current exercise only (super fast!)"
              >
                {testRunning ? '⏳' : '⚡'} This Exercise
              </button>
            )}
            <button
              onClick={() => runTests()}
              disabled={testRunning}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: testRunning ? '#9e9e9e' : '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: testRunning ? 'not-allowed' : 'pointer',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              title="Run all 239 tests (slow)"
            >
              {testRunning ? '⏳' : '▶️'} All Tests
            </button>
          </div>
        </div>
        {currentExerciseId && filteredStats.totalTests > 0 && (
          <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>
            Showing tests for this exercise only • Exercise {getExerciseNumber(currentExerciseId)}
          </div>
        )}
      </div>

      {/* Test Suites - Scrollable area */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
        minHeight: 0, // Allow shrinking
      }}>
        {filteredSuites.length === 0 ? (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
          }}>
            <p>No test results available yet.</p>
            <p style={{ fontSize: '0.875rem' }}>Click the <strong>"⚡ This Exercise"</strong> button above to run tests!</p>
          </div>
        ) : (
          filteredSuites.map((suite) => {
          const isExpanded = expandedSuites.has(suite.file)
          const fileName = getFileNameFromPath(suite.file)
          const allPassed = suite.failCount === 0 && suite.passCount > 0

          // Get the current exercise title
          const currentExercise = currentExerciseId ? getExerciseById(currentExerciseId) : null
          const displayTitle = currentExercise ? currentExercise.title : fileName

          return (
            <div key={suite.file} style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}>
              {/* Suite Header */}
              <div
                onClick={() => toggleSuite(suite.file)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  cursor: 'pointer',
                  backgroundColor: allPassed ? '#e8f5e9' : '#fff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem' }}>{isExpanded ? '▼' : '▶'}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{displayTitle}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
                  <span style={{ color: '#4caf50' }}>✓ {suite.passCount}</span>
                  <span style={{ color: '#f44336' }}>✗ {suite.failCount}</span>
                </div>
              </div>

              {/* Test List */}
              {isExpanded && (
                <div style={{ padding: '0.5rem', borderTop: '1px solid #e0e0e0' }}>
                  {suite.tests.map((test, idx) => (
                    <div
                      key={`${suite.file}-${idx}`}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor:
                          test.status === 'fail' ? '#ffebee' : 'transparent',
                        borderRadius: '4px',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          color: getStatusColor(test.status),
                          fontWeight: 'bold',
                          minWidth: '20px',
                        }}
                      >
                        {test.status === 'pass' ? '✓' : test.status === 'fail' ? '✗' : '⊘'}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div>{test.name}</div>
                        {test.error && (
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: '#d32f2f',
                              marginTop: '0.5rem',
                              fontFamily: 'monospace',
                              whiteSpace: 'pre-wrap',
                              backgroundColor: '#fff',
                              padding: '0.75rem',
                              borderRadius: '4px',
                              border: '1px solid #ffcdd2',
                              lineHeight: '1.6',
                              maxHeight: '300px',
                              overflowY: 'auto',
                            }}
                          >
                            {stripAnsiCodes(test.error)
                              .replace(/^Error: /, '') // Remove redundant "Error:" prefix
                              .split(/\n\s*at /)[0] // Remove stack trace (everything after "at ...")
                              .replace(/\n\n+/g, '\n') // Collapse multiple newlines to single
                              .trim()}
                          </div>
                        )}
                      </div>
                      <span style={{ color: '#999', fontSize: '0.75rem' }}>
                        {test.duration.toFixed(0)}ms
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })
        )}
      </div>
    </div>
  )
}
