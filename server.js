/**
 * Simple Express server to run tests from the UI
 */
import express from 'express'
import { exec } from 'child_process'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let testRunning = false

app.post('/api/run-tests', (req, res) => {
  if (testRunning) {
    return res.status(409).json({
      error: 'Tests are already running',
      running: true
    })
  }

  const { testFile, exerciseNumber } = req.body || {}

  testRunning = true
  res.json({ message: 'Tests started', running: true })

  // Build command with optional file and exercise filter
  let command = 'npm test -- --run'
  if (testFile) {
    // Extract just the filename without path and extension
    const fileName = testFile.split('/').pop()?.replace('.test.tsx', '') || testFile
    command = `npm test -- --run ${fileName}`

    // If exerciseNumber provided, filter to specific exercise tests
    if (exerciseNumber) {
      command += ` -t 'Exercise ${exerciseNumber}'`
      console.log(`Running Exercise ${exerciseNumber} tests in ${fileName}`)
      console.log(`Command: ${command}`)
    } else {
      console.log(`Running all tests in ${fileName}`)
      console.log(`Command: ${command}`)
    }
  } else {
    console.log('Running all tests')
    console.log(`Command: ${command}`)
  }

  // Run tests in background with timeout
  const startTime = Date.now()
  const testProcess = exec(command, {
    shell: '/bin/bash',
    timeout: 60000, // 60 second timeout
    killSignal: 'SIGKILL'
  }, (error, stdout, stderr) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    testRunning = false
    console.log(`Tests completed in ${duration}s`)
    if (error) {
      if (error.killed) {
        console.error('Tests timed out after 60 seconds')
      } else {
        console.error(`Error: ${error.message}`)
      }
    }
    if (stderr && !stderr.includes('Stderr:')) {
      console.error(`Stderr: ${stderr}`)
    }
  })

  // Ensure we reset the flag even if callback fails
  setTimeout(() => {
    if (testRunning) {
      console.error('Force resetting testRunning flag after 65 seconds')
      testRunning = false
      if (testProcess && !testProcess.killed) {
        testProcess.kill('SIGKILL')
      }
    }
  }, 65000)
})

app.get('/api/test-status', (req, res) => {
  res.json({ running: testRunning })
})

app.listen(PORT, () => {
  console.log(`Test runner server listening on http://localhost:${PORT}`)
})
