/**
 * Session 2.2 - Props Solutions
 *
 * Reference implementations for the exercises
 */

// SOLUTION 1: Button component with props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  const styles = {
    primary: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  }

  return (
    <button onClick={onClick} style={styles[variant]}>
      {label}
    </button>
  )
}

// SOLUTION 2: UserCard with destructured props
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  isActive: boolean
}

interface UserCardProps {
  user: User
  onSelect: (id: string) => void
}

export function UserCard({ user, onSelect }: UserCardProps) {
  const roleColors = {
    admin: '#dc3545',
    user: '#28a745',
    guest: '#6c757d',
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h3 style={{ margin: 0 }}>{user.name}</h3>
        <span
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: user.isActive ? '#28a745' : '#6c757d',
          }}
        />
      </div>
      <p style={{ color: '#666', margin: '8px 0' }}>{user.email}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: roleColors[user.role],
            color: 'white',
            fontSize: '12px',
            textTransform: 'uppercase',
          }}
        >
          {user.role}
        </span>
        <button
          onClick={() => onSelect(user.id)}
          style={{
            marginLeft: 'auto',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #007bff',
            backgroundColor: 'white',
            color: '#007bff',
            cursor: 'pointer',
          }}
        >
          Select
        </button>
      </div>
    </div>
  )
}

// Test the UserCard
export function UserCardDemo() {
  const user: User = {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'admin',
    isActive: true,
  }

  const handleSelect = (id: string) => {
    console.log('Selected user:', id)
  }

  return (
    <div style={{ maxWidth: '400px', margin: '20px' }}>
      <UserCard user={user} onSelect={handleSelect} />
    </div>
  )
}

// SOLUTION 3: Badge with default values
interface BadgeProps {
  text: string
  color?: 'blue' | 'green' | 'red' | 'gray'
  size?: 'small' | 'medium' | 'large'
}

export function Badge({ text, color = 'gray', size = 'medium' }: BadgeProps) {
  const colors = {
    blue: '#007bff',
    green: '#28a745',
    red: '#dc3545',
    gray: '#6c757d',
  }

  const sizes = {
    small: { padding: '2px 6px', fontSize: '10px' },
    medium: { padding: '4px 8px', fontSize: '12px' },
    large: { padding: '6px 12px', fontSize: '14px' },
  }

  return (
    <span
      style={{
        ...sizes[size],
        backgroundColor: colors[color],
        color: 'white',
        borderRadius: '12px',
        display: 'inline-block',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '4px',
      }}
    >
      {text}
    </span>
  )
}

// SOLUTION 4: Card with children
interface CardProps {
  title: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        margin: '16px',
      }}
    >
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  )
}

// SOLUTION 5: Input with rest props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <div style={{ margin: '16px 0' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        {...rest}
        style={{
          width: '100%',
          padding: '8px',
          border: `1px solid ${error ? '#dc3545' : '#ddd'}`,
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
      {error && (
        <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  )
}