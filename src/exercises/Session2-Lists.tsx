/**
 * Session 2.4 - Lists and Keys
 *
 * Exercise: Rendering lists in React
 */

// Sample data for exercises
interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: 'food' | 'transport' | 'entertainment' | 'other'
}

const transactions: Transaction[] = [
  { id: '1', description: 'Grocery Store', amount: -45.5, date: '2024-01-20', category: 'food' },
  { id: '2', description: 'Uber', amount: -12.3, date: '2024-01-20', category: 'transport' },
  { id: '3', description: 'Salary', amount: 3000, date: '2024-01-15', category: 'other' },
  { id: '4', description: 'Netflix', amount: -15.99, date: '2024-01-18', category: 'entertainment' },
  { id: '5', description: 'Restaurant', amount: -67.8, date: '2024-01-19', category: 'food' },
]

// EXERCISE 1: Basic list rendering
// Render the transactions as a simple list
export function TransactionList() {
  // TODO: Use .map() to render each transaction
  // Remember to add the 'key' prop!
  // Display: description and amount

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {/* TODO: Map over transactions here */}
      </ul>
    </div>
  )
}

// EXERCISE 2: Extract list item to separate component
// Create a TransactionItem component for better organization
interface TransactionItemProps {
  transaction: Transaction
}

function TransactionItem({ transaction }: TransactionItemProps) {
  // TODO: Implement the transaction item
  // - Show description
  // - Show amount (with + or - sign)
  // - Color amount: green if positive, red if negative
  // - Show date
  // - Show category badge

  return <li>TODO: Implement TransactionItem</li>
}

export function ImprovedTransactionList() {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          // TODO: Add proper key and use TransactionItem component
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  )
}

// EXERCISE 3: Empty state handling
// Show a message when there are no transactions
export function TransactionListWithEmptyState() {
  const emptyTransactions: Transaction[] = []

  // TODO: Check if array is empty
  // - If empty, show "No transactions found" message
  // - If not empty, show the list

  return <div>TODO: Add empty state handling</div>
}

// EXERCISE 4: Filtered list
// Show only transactions of a specific category
export function FilteredTransactionList() {
  const selectedCategory: Transaction['category'] = 'food'

  // TODO: Filter transactions by selectedCategory
  // Then map and render the filtered results

  return (
    <div>
      <h2>Food Transactions</h2>
      {/* TODO: Render filtered list */}
    </div>
  )
}

// EXERCISE 5: List with actions
// Add click handlers to list items
interface InteractiveTransactionItemProps {
  transaction: Transaction
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

function InteractiveTransactionItem({
  transaction,
  onSelect,
  onDelete,
}: InteractiveTransactionItemProps) {
  // TODO: Implement interactive item with:
  // - Click on the item calls onSelect
  // - Delete button calls onDelete
  // - Style the item (border, padding, hover effect)

  return <li>TODO: Implement InteractiveTransactionItem</li>
}

export function InteractiveTransactionList() {
  const handleSelect = (id: string) => {
    console.log('Selected transaction:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete transaction:', id)
  }

  return (
    <div>
      <h2>Interactive Transactions</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transactions.map((transaction) => (
          <InteractiveTransactionItem
            key={transaction.id}
            transaction={transaction}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}

// EXERCISE 6: Common key mistakes
// Fix the key-related issues in these examples

// ❌ BAD: Using index as key (causes bugs when list reorders)
export function BadKeyExample() {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>{transaction.description}</li>
      ))}
    </ul>
  )
}

// TODO: Rewrite this to use proper keys (transaction.id)
export function GoodKeyExample() {
  return (
    <ul>
      {/* TODO: Fix the key to use transaction.id */}
    </ul>
  )
}

// EXERCISE 7: Nested lists
// Transactions grouped by category
export function GroupedTransactionList() {
  // TODO: Group transactions by category
  // Hint: Create an object like { food: [...], transport: [...], ... }
  // Then map over the categories and render each group

  const grouped = {
    food: transactions.filter((t) => t.category === 'food'),
    transport: transactions.filter((t) => t.category === 'transport'),
    entertainment: transactions.filter((t) => t.category === 'entertainment'),
    other: transactions.filter((t) => t.category === 'other'),
  }

  return (
    <div>
      <h2>Grouped Transactions</h2>
      {/* TODO: Map over categories and render each group */}
      {/* Remember: both outer and inner lists need keys! */}
    </div>
  )
}
