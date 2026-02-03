/**
 * Session 1 - Lists and Keys - SOLUTIONS
 *
 * This file contains complete solutions for the Lists exercises.
 * Topics covered:
 * - Basic list rendering with .map()
 * - Proper use of keys
 * - Component extraction
 * - Empty state handling
 * - Filtering lists
 * - Interactive list items
 * - Nested/grouped lists
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

// SOLUTION 1: Basic list rendering
// Render the transactions as a simple list
export function TransactionList() {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

// SOLUTION 2: Extract list item to separate component
// Create a TransactionItem component for better organization
interface TransactionItemProps {
  transaction: Transaction
}

function TransactionItem({ transaction }: TransactionItemProps) {
  const isPositive = transaction.amount >= 0
  const amountColor = isPositive ? 'green' : 'red'
  const amountSign = isPositive ? '+' : ''

  return (
    <li style={{ marginBottom: '10px' }}>
      <div>
        <strong>{transaction.description}</strong>
        <span style={{ color: amountColor, marginLeft: '10px' }}>
          {amountSign}${transaction.amount.toFixed(2)}
        </span>
      </div>
      <div style={{ fontSize: '0.9em', color: '#666' }}>
        <span>{transaction.date}</span>
        <span
          style={{
            marginLeft: '10px',
            padding: '2px 8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
            fontSize: '0.85em',
          }}
        >
          {transaction.category}
        </span>
      </div>
    </li>
  )
}

export function ImprovedTransactionList() {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  )
}

// SOLUTION 3: Empty state handling
// Show a message when there are no transactions
export function TransactionListWithEmptyState() {
  const emptyTransactions: Transaction[] = []

  if (emptyTransactions.length === 0) {
    return (
      <div>
        <h2>Transactions</h2>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No transactions found
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {emptyTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}: ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

// SOLUTION 4: Filtered list
// Show only transactions of a specific category
export function FilteredTransactionList() {
  const selectedCategory: Transaction['category'] = 'food'

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.category === selectedCategory
  )

  return (
    <div>
      <h2>Food Transactions</h2>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description}: ${transaction.amount.toFixed(2)}
            <span style={{ marginLeft: '10px', color: '#666' }}>
              {transaction.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// SOLUTION 5: List with actions
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
  const isPositive = transaction.amount >= 0
  const amountColor = isPositive ? 'green' : 'red'
  const amountSign = isPositive ? '+' : ''

  return (
    <li
      onClick={() => onSelect(transaction.id)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <div>
        <div>
          <strong>{transaction.description}</strong>
          <span style={{ color: amountColor, marginLeft: '10px' }}>
            {amountSign}${transaction.amount.toFixed(2)}
          </span>
        </div>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          {transaction.date} • {transaction.category}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation() // Prevent triggering onSelect
          onDelete(transaction.id)
        }}
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </li>
  )
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

// SOLUTION 6: Common key mistakes
// Fix the key-related issues in these examples

// BAD: Using index as key (causes bugs when list reorders)
export function BadKeyExample() {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>{transaction.description}</li>
      ))}
    </ul>
  )
}

// GOOD: Using proper unique identifier as key
export function GoodKeyExample() {
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>{transaction.description}</li>
      ))}
    </ul>
  )
}

// SOLUTION 7: Nested lists
// Transactions grouped by category
export function GroupedTransactionList() {
  const grouped = {
    food: transactions.filter((t) => t.category === 'food'),
    transport: transactions.filter((t) => t.category === 'transport'),
    entertainment: transactions.filter((t) => t.category === 'entertainment'),
    other: transactions.filter((t) => t.category === 'other'),
  }

  return (
    <div>
      <h2>Grouped Transactions</h2>
      {Object.entries(grouped).map(([category, items]) => {
        // Skip categories with no items
        if (items.length === 0) return null

        // Calculate total for this category
        const total = items.reduce((sum, item) => sum + item.amount, 0)

        return (
          <div key={category} style={{ marginBottom: '20px' }}>
            <h3 style={{ textTransform: 'capitalize' }}>
              {category} ({items.length} transactions)
            </h3>
            <ul>
              {items.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.description}: ${transaction.amount.toFixed(2)}
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    {transaction.date}
                  </span>
                </li>
              ))}
            </ul>
            <p style={{ fontWeight: 'bold', marginLeft: '20px' }}>
              Category Total: ${total.toFixed(2)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
