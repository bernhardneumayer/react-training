/**
 * React Training - Live Coding Area
 *
 * Import exercises and render them below to test your work.
 * Feel free to delete everything and start fresh!
 */

// Import the exercises you want to test
import { BrokenComponent } from './exercises/01-Session1-JSX'

// ============================================
// 🎨 YOUR WORKSPACE
// ============================================
function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Session Header */}
      <h1>📚 React Training</h1>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '2px solid #eee' }} />

      {/* ========================================== */}
      {/* 🎯 RENDER YOUR EXERCISES HERE             */}
      {/* ========================================== */}

      <BrokenComponent />

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '2px solid #eee' }} />

      {/* Helper Instructions */}
      <details style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          💡 How to use this
        </summary>
        <ol style={{ marginTop: '1rem' }}>
          <li>Import from <code>src/exercises/exercise-name.tsx</code></li>
          <li>Work on one exercise at a time</li>
          <li>Uncomment that exercise above to see it</li>
          <li>Save and check the browser</li>
        </ol>
      </details>
    </div>
  )
}

export default App
