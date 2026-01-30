/**
 * Exercise Configuration
 * Central place to define all exercises and their metadata
 */

import type { ComponentType } from 'react'

// Import all exercises
import {
  BrokenComponent,
  WelcomeCard,
  ExpressionPractice,
  UserProfile,
} from './exercises/01-Session1-JSX'

import {
  ButtonDemo,
  BadgeDemo,
  UserCard,
  Card,
  CardDemo,
  Input,
  InputDemo,
} from './exercises/02-Session1-Props'

import {
  TransactionList,
  ImprovedTransactionList,
  TransactionListWithEmptyState,
  FilteredTransactionList,
  InteractiveTransactionList,
  GoodKeyExample,
  GroupedTransactionList,
} from './exercises/03-Session1-Lists'

import {
  ClickCounter,
  ControlledInput,
  LoginForm,
  ItemList,
  KeyboardHandler,
  EventBubbling,
  MultiEventComponent,
  FocusEvents,
  TodoInput,
} from './exercises/04-Session1-Events'

import {
  Counter,
  NameInput,
  UserForm,
  ToggleVisibility,
  TodoList,
  BetterUserForm,
  FastCounter,
  UserSettings,
  ExpensiveInitialization,
  ShoppingCart,
} from './exercises/05-Session2-State'

import {
  MountLogger,
  PageTitle,
  UserProfileDemo,
  Timer,
  WindowSize,
  PersistentCounter,
  SearchInput,
  DependencyArrayDemo,
  DerivedStateExample,
  ChatRoomDemo,
} from './exercises/06-Session2-Effects'

import {
  AutoFocusInput,
  FocusButton,
  ScrollToSection,
  ElementSize,
  PreviousValueDemo,
  RenderCounter,
  StopwatchWithRef,
  VideoPlayer,
  ClickOutsideDemo,
  RefVsState,
  UncontrolledForm,
} from './exercises/07-Session2-Refs'

export interface Exercise {
  id: string
  title: string
  difficulty: 1 | 2 | 3 | 4 // ⭐ to ⭐⭐⭐⭐
  component: ComponentType
  instructions?: string
}

export interface ExerciseSection {
  id: string
  title: string
  sessionNumber: number
  exercises: Exercise[]
}

export const exerciseConfig: ExerciseSection[] = [
  // ============================================
  // SESSION 1 - React Basics
  // ============================================
  {
    id: 'session1-jsx',
    title: 'JSX Fundamentals',
    sessionNumber: 1,
    exercises: [
      {
        id: 'jsx-1',
        title: 'Fix JSX Errors',
        difficulty: 1,
        component: BrokenComponent,
        instructions: 'Uncomment the code and fix the JSX syntax errors',
      },
      {
        id: 'jsx-2',
        title: 'Welcome Card',
        difficulty: 2,
        component: WelcomeCard,
        instructions: 'Create a greeting card with conditional rendering',
      },
      {
        id: 'jsx-3',
        title: 'Expression vs Statement',
        difficulty: 2,
        component: ExpressionPractice,
        instructions: 'Convert statements to JSX expressions',
      },
      {
        id: 'jsx-4',
        title: 'User Profile',
        difficulty: 2,
        component: UserProfile,
        instructions: 'Display user information with JSX interpolation',
      },
    ],
  },
  {
    id: 'session1-props',
    title: 'Props & TypeScript',
    sessionNumber: 1,
    exercises: [
      {
        id: 'props-1',
        title: 'Button Component',
        difficulty: 1,
        component: ButtonDemo,
        instructions: 'Create a Button component with variant prop',
      },
      {
        id: 'props-2',
        title: 'User Card',
        difficulty: 2,
        component: UserCard,
        instructions: 'Create a UserCard with destructured props',
      },
      {
        id: 'props-3',
        title: 'Badge with Defaults',
        difficulty: 2,
        component: BadgeDemo,
        instructions: 'Create Badge component with default props',
      },
      {
        id: 'props-4',
        title: 'Card with Children',
        difficulty: 2,
        component: CardDemo,
        instructions: 'Create Card component that accepts children',
      },
      {
        id: 'props-5',
        title: 'Input with Rest Props',
        difficulty: 3,
        component: InputDemo,
        instructions: 'Create Input with rest props pattern',
      },
    ],
  },
  {
    id: 'session1-lists',
    title: 'Lists & Keys',
    sessionNumber: 1,
    exercises: [
      {
        id: 'lists-1',
        title: 'Transaction List',
        difficulty: 1,
        component: TransactionList,
        instructions: 'Render a basic list of transactions',
      },
      {
        id: 'lists-2',
        title: 'Extract Component',
        difficulty: 2,
        component: ImprovedTransactionList,
        instructions: 'Extract TransactionItem component',
      },
      {
        id: 'lists-3',
        title: 'Empty State',
        difficulty: 1,
        component: TransactionListWithEmptyState,
        instructions: 'Add empty state handling',
      },
      {
        id: 'lists-4',
        title: 'Filtering',
        difficulty: 2,
        component: FilteredTransactionList,
        instructions: 'Add filtering functionality',
      },
      {
        id: 'lists-5',
        title: 'Interactive List',
        difficulty: 3,
        component: InteractiveTransactionList,
        instructions: 'Add click handlers and selection',
      },
      {
        id: 'lists-6',
        title: 'Fix Key Mistakes',
        difficulty: 1,
        component: GoodKeyExample,
        instructions: 'Identify and fix incorrect key usage',
      },
      {
        id: 'lists-7',
        title: 'Nested Lists',
        difficulty: 3,
        component: GroupedTransactionList,
        instructions: 'Render grouped transactions',
      },
    ],
  },
  {
    id: 'session1-events',
    title: 'Event Handling',
    sessionNumber: 1,
    exercises: [
      {
        id: 'events-1',
        title: 'Basic Click Handler',
        difficulty: 1,
        component: ClickCounter,
        instructions: 'Add onClick handler to button',
      },
      {
        id: 'events-2',
        title: 'Controlled Input',
        difficulty: 1,
        component: ControlledInput,
        instructions: 'Create controlled input with onChange',
      },
      {
        id: 'events-3',
        title: 'Form Submission',
        difficulty: 2,
        component: LoginForm,
        instructions: 'Handle form submit with preventDefault',
      },
      {
        id: 'events-4',
        title: 'Passing Data',
        difficulty: 2,
        component: ItemList,
        instructions: 'Pass data with event handlers',
      },
      {
        id: 'events-5',
        title: 'Keyboard Events',
        difficulty: 2,
        component: KeyboardHandler,
        instructions: 'Handle keyboard events',
      },
      {
        id: 'events-6',
        title: 'Event Types',
        difficulty: 2,
        component: MultiEventComponent,
        instructions: 'Practice TypeScript event types',
      },
      {
        id: 'events-7',
        title: 'Multiple Handlers',
        difficulty: 3,
        component: FocusEvents,
        instructions: 'Manage multiple event handlers',
      },
      {
        id: 'events-8',
        title: 'Event Bubbling',
        difficulty: 3,
        component: EventBubbling,
        instructions: 'Understand and control event bubbling',
      },
      {
        id: 'events-9',
        title: 'Todo Input',
        difficulty: 3,
        component: TodoInput,
        instructions: 'Combine multiple concepts',
      },
    ],
  },

  // ============================================
  // SESSION 2 - React Hooks
  // ============================================
  {
    id: 'session2-state',
    title: 'useState Hook',
    sessionNumber: 2,
    exercises: [
      {
        id: 'state-1',
        title: 'Simple Counter',
        difficulty: 1,
        component: Counter,
        instructions: 'Create a counter with useState',
      },
      {
        id: 'state-2',
        title: 'Controlled Text Input',
        difficulty: 1,
        component: NameInput,
        instructions: 'Create controlled text input',
      },
      {
        id: 'state-3',
        title: 'Multiple State Variables',
        difficulty: 2,
        component: UserForm,
        instructions: 'Manage multiple state variables',
      },
      {
        id: 'state-4',
        title: 'Toggle State',
        difficulty: 1,
        component: ToggleVisibility,
        instructions: 'Implement toggle functionality',
      },
      {
        id: 'state-5',
        title: 'Array State',
        difficulty: 2,
        component: TodoList,
        instructions: 'Manage array in state',
      },
      {
        id: 'state-6',
        title: 'Object State',
        difficulty: 2,
        component: BetterUserForm,
        instructions: 'Update object state immutably',
      },
      {
        id: 'state-7',
        title: 'Derived State',
        difficulty: 2,
        component: FastCounter,
        instructions: 'Calculate values from state',
      },
      {
        id: 'state-8',
        title: 'Nested Object State',
        difficulty: 3,
        component: UserSettings,
        instructions: 'Update nested object state',
      },
      {
        id: 'state-9',
        title: 'Lazy Initialization',
        difficulty: 2,
        component: ExpensiveInitialization,
        instructions: 'Use lazy initialization',
      },
      {
        id: 'state-10',
        title: 'Shopping Cart',
        difficulty: 4,
        component: ShoppingCart,
        instructions: 'Build comprehensive shopping cart',
      },
    ],
  },
  {
    id: 'session2-effects',
    title: 'useEffect Hook',
    sessionNumber: 2,
    exercises: [
      {
        id: 'effects-1',
        title: 'Mount/Unmount Logger',
        difficulty: 1,
        component: MountLogger,
        instructions: 'Log on mount and unmount',
      },
      {
        id: 'effects-2',
        title: 'Document Title Sync',
        difficulty: 2,
        component: PageTitle,
        instructions: 'Update document title with useEffect',
      },
      {
        id: 'effects-3',
        title: 'Data Fetching',
        difficulty: 3,
        component: UserProfileDemo,
        instructions: 'Fetch data with loading states',
      },
      {
        id: 'effects-4',
        title: 'Cleanup Function',
        difficulty: 2,
        component: WindowSize,
        instructions: 'Implement cleanup for subscriptions',
      },
      {
        id: 'effects-5',
        title: 'Interval Timer',
        difficulty: 2,
        component: Timer,
        instructions: 'Create timer with cleanup',
      },
      {
        id: 'effects-6',
        title: 'Dependency Array',
        difficulty: 2,
        component: DependencyArrayDemo,
        instructions: 'Practice dependency arrays',
      },
      {
        id: 'effects-7',
        title: 'Local Storage Sync',
        difficulty: 3,
        component: PersistentCounter,
        instructions: 'Sync state with localStorage',
      },
      {
        id: 'effects-8',
        title: 'Dependency Mistakes',
        difficulty: 3,
        component: SearchInput,
        instructions: 'Fix dependency array issues',
      },
      {
        id: 'effects-9',
        title: 'When NOT to use useEffect',
        difficulty: 2,
        component: DerivedStateExample,
        instructions: 'Identify useEffect anti-patterns',
      },
      {
        id: 'effects-10',
        title: 'Chat Room Subscription',
        difficulty: 4,
        component: ChatRoomDemo,
        instructions: 'Complex subscription with cleanup',
      },
    ],
  },
  {
    id: 'session2-refs',
    title: 'useRef Hook',
    sessionNumber: 2,
    exercises: [
      {
        id: 'refs-1',
        title: 'Auto-focus Input',
        difficulty: 1,
        component: AutoFocusInput,
        instructions: 'Focus input on mount',
      },
      {
        id: 'refs-2',
        title: 'Manual Focus Control',
        difficulty: 1,
        component: FocusButton,
        instructions: 'Add button to focus input',
      },
      {
        id: 'refs-3',
        title: 'Scroll to Section',
        difficulty: 2,
        component: ScrollToSection,
        instructions: 'Scroll to element on click',
      },
      {
        id: 'refs-4',
        title: 'Measuring Elements',
        difficulty: 2,
        component: ElementSize,
        instructions: 'Get element dimensions',
      },
      {
        id: 'refs-5',
        title: 'Previous Value',
        difficulty: 2,
        component: PreviousValueDemo,
        instructions: 'Track previous prop/state value',
      },
      {
        id: 'refs-6',
        title: 'Mutable Value',
        difficulty: 2,
        component: RenderCounter,
        instructions: 'Store mutable value without re-render',
      },
      {
        id: 'refs-7',
        title: 'Interval with Ref',
        difficulty: 3,
        component: StopwatchWithRef,
        instructions: 'Manage interval ID with ref',
      },
      {
        id: 'refs-8',
        title: 'Video Player Controls',
        difficulty: 3,
        component: VideoPlayer,
        instructions: 'Control video element with ref',
      },
      {
        id: 'refs-9',
        title: 'Canvas Drawing',
        difficulty: 3,
        component: RefVsState,
        instructions: 'Draw on canvas with ref',
      },
      {
        id: 'refs-10',
        title: 'Click Outside',
        difficulty: 3,
        component: ClickOutsideDemo,
        instructions: 'Detect clicks outside element',
      },
      {
        id: 'refs-11',
        title: 'Callback Ref',
        difficulty: 4,
        component: UncontrolledForm,
        instructions: 'Use callback ref pattern',
      },
    ],
  },
]

// Helper to get all exercises flattened
export const getAllExercises = (): Exercise[] => {
  return exerciseConfig.flatMap((section) => section.exercises)
}

// Helper to find exercise by ID
export const getExerciseById = (id: string): Exercise | undefined => {
  return getAllExercises().find((ex) => ex.id === id)
}

// Helper to get total count
export const getTotalExerciseCount = (): number => {
  return getAllExercises().length
}

// Helper to get exercises by session
export const getExercisesBySession = (sessionNumber: number): ExerciseSection[] => {
  return exerciseConfig.filter((section) => section.sessionNumber === sessionNumber)
}
