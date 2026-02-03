/**
 * Custom Vitest reporter that writes test results to a JSON file
 * This allows the React app to read and display test results
 */

import { writeFileSync } from 'fs'
import type { Reporter, File } from 'vitest'

interface TestResult {
  id: string
  name: string
  status: 'pass' | 'fail' | 'skip'
  duration: number
  error?: string
}

interface SuiteResult {
  file: string
  tests: TestResult[]
  passCount: number
  failCount: number
  skipCount: number
  duration: number
}

export default class JsonReporter implements Reporter {
  private results: SuiteResult[] = []

  onFinished(files?: File[]) {
    if (!files) return

    this.results = files.map((file) => {
      const tests = this.collectTests(file.tasks)
      const passCount = tests.filter((t) => t.status === 'pass').length
      const failCount = tests.filter((t) => t.status === 'fail').length
      const skipCount = tests.filter((t) => t.status === 'skip').length
      const duration = file.result?.duration || 0

      return {
        file: file.name,
        tests,
        passCount,
        failCount,
        skipCount,
        duration,
      }
    })

    // Write results to public directory so React app can fetch it
    const outputPath = './public/test-results.json'
    writeFileSync(
      outputPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          totalTests: this.results.reduce((sum, s) => sum + s.tests.length, 0),
          totalPass: this.results.reduce((sum, s) => sum + s.passCount, 0),
          totalFail: this.results.reduce((sum, s) => sum + s.failCount, 0),
          totalSkip: this.results.reduce((sum, s) => sum + s.skipCount, 0),
          suites: this.results,
        },
        null,
        2
      )
    )
  }

  private collectTests(tasks: any[]): TestResult[] {
    const results: TestResult[] = []

    for (const task of tasks) {
      if (task.type === 'test') {
        results.push({
          id: task.id,
          name: task.name,
          status: task.result?.state === 'pass' ? 'pass' : task.result?.state === 'skip' ? 'skip' : 'fail',
          duration: task.result?.duration || 0,
          error: task.result?.errors?.[0]?.message,
        })
      } else if (task.type === 'suite' && 'tasks' in task) {
        results.push(...this.collectTests(task.tasks))
      }
    }

    return results
  }
}
