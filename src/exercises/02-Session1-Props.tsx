/**
 * Session 2.2 - Props and TypeScript
 *
 * Exercise: Learn to pass and use props
 */

// EXERCISE 1: Create a Button component with props
// Requirements:
// - Accept a 'label' prop (string)
// - Accept an 'onClick' prop (function)
// - Accept an optional 'variant' prop ('primary' | 'secondary')
// - Style differently based on variant

interface ButtonProps {
  // TODO: Define the prop types here
}

export function Button(/* TODO: Add props */) {
  // TODO: Implement the button component
  return <button>TODO: Implement Button</button>
}

// Test the Button component
export function ButtonDemo() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div>
      <Button label="Primary Button" onClick={handleClick} variant="primary" />
      <Button label="Secondary Button" onClick={handleClick} variant="secondary" />
    </div>
  )
}

// EXERCISE 2: UserCard with destructured props
// Create a card component that displays user information
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  isActive: boolean
}

interface UserCardProps {
  // TODO: Add props for user and onSelect callback
}

export function UserCard(/* TODO: Destructure props here */) {
  // TODO: Implement UserCard that shows:
  // - User name (large text)
  // - Email (smaller text)
  // - Role badge with different colors per role
  // - Status indicator (green if active, gray if not)
  // - A "Select" button that calls onSelect with the user id

  return <div>TODO: Implement UserCard</div>
}

// EXERCISE 3: Props with default values
// Create a Badge component with optional props and defaults
interface BadgeProps {
  text: string
  color?: 'blue' | 'green' | 'red' | 'gray' // Optional, default to 'gray'
  size?: 'small' | 'medium' | 'large' // Optional, default to 'medium'
}

export function Badge({ text, color = 'gray', size = 'medium' }: BadgeProps) {
  // TODO: Implement Badge with different styles based on color and size
  // Use inline styles or className based on props

  return <span>TODO: Implement Badge</span>
}

// Test the Badge component
export function BadgeDemo() {
  return (
    <div>
      <Badge text="Default" />
      <Badge text="Success" color="green" />
      <Badge text="Error" color="red" size="large" />
      <Badge text="Info" color="blue" size="small" />
    </div>
  )
}

// EXERCISE 4: Children prop
// Create a Card component that accepts children
interface CardProps {
  title: string
  children: React.ReactNode // Special prop for nested content
}

export function Card({ title, children }: CardProps) {
  // TODO: Implement Card that shows:
  // - Title in a header
  // - Children in the body
  // - Some nice styling (border, padding, shadow)

  return <div>TODO: Implement Card</div>
}

// Test the Card component
export function CardDemo() {
  return (
    <Card title="User Details">
      <p>This content is passed as children</p>
      <p>You can put any JSX here!</p>
      <button>Action Button</button>
    </Card>
  )
}

// EXERCISE 5: Rest props pattern
// Create an Input component that forwards HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, ...rest }: InputProps) {
  // TODO: Implement Input that:
  // - Shows a label above the input
  // - Forwards all other props to the <input> element using {...rest}
  // - Shows error message if provided
  // - Changes border color to red if there's an error

  return <div>TODO: Implement Input</div>
}

// Test the Input component
export function InputDemo() {
  return (
    <div>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        error="Password is too short"
      />
    </div>
  )
}
