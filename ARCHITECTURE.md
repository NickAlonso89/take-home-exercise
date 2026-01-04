# Architecture Documentation

## Overview

This application is a multi-step form built with React and TypeScript. It follows a component-based architecture with context-based state management for form data.

## Architecture Patterns

### State Management

The application uses **React Context API** for form state management:

- **FormProvider**: Provides form state and actions to all child components
- **FormContext**: Defines the context type and creates the context instance
- **useFormContext**: Custom hook to access form context (with error handling)

**State Flow:**

```
App.tsx (manages formData state)
  └── FormProvider (provides context)
      └── Tab Components (consume context via useFormContext)
          └── Form Components (use context to update state)
```

### Form Data Persistence

Form data is automatically persisted to `localStorage` with:

- **Debouncing**: 300ms delay to prevent excessive writes
- **Automatic restoration**: Data is restored on page load
- **Cleanup**: Data is saved on component unmount

### Component Structure

#### Core Components

1. **App.tsx**
   - Root component managing form state
   - Handles localStorage persistence
   - Manages form step progression
   - Provides context to child components

2. **FormProvider**
   - Wraps form components with context
   - Memoizes context value to prevent unnecessary re-renders

3. **Tab Components** (EmailTab, InfoTab, AddressTab, CompleteTab)
   - Each represents a step in the form flow
   - Uses `useFormSubmission` hook for validation and submission
   - Updates form state and progresses to next step on success

#### Reusable Components

1. **FormField**
   - Floating label input component
   - Error state with animations
   - Supports icons and various input types

2. **AddressAutocomplete**
   - Google Places API integration
   - Parses addresses into structured components
   - Restricted to US addresses

3. **Tabs**
   - Tab navigation component
   - Keyboard accessible (Arrow keys)
   - Disables tabs based on form step

4. **Form**
   - Wrapper for form elements
   - Styled submit button with icon

### Custom Hooks

#### useFormContext

- Provides access to form context
- Throws error if used outside FormProvider
- Type-safe context access

#### useFormSubmission

- Handles form submission logic
- Validates specified fields
- Supports custom validation
- Transforms form data before submission
- Manages error state

### Utilities

#### validation.ts

- Field validators (email, dateOfBirth, phoneNumber, zipCode)
- Returns `ValidationResult` with isValid and optional error message
- Validators are optional (empty values return valid)

#### formData.ts

- Converts FormData to typed FormDataState
- Handles checkbox values ("on" or undefined)
- Type-safe key filtering
- Excludes invalid keys

#### addressParser.ts

- Parses Google Maps Geocoder results
- Extracts street, city, state, zip components
- Returns structured address object

#### classNames.ts

- Utility functions for conditional className generation
- Used for consistent styling across components
- Handles transitions and state-based classes

## Form Flow

```
Step 0: EmailTab
  ├── Collect email
  ├── Marketing consent checkbox
  └── Terms & conditions checkbox
  └── On submit → Step 1

Step 1: InfoTab (within Tabs)
  ├── Collect full name
  ├── Collect date of birth
  └── Select gender
  └── On submit → Step 2

Step 2: AddressTab (within Tabs)
  ├── Address autocomplete
  ├── Phone number
  ├── Marketing consent checkbox
  └── Terms & conditions checkbox
  └── On submit → Step 3

Step 3: CompleteTab
  └── Confirmation screen
```

## Data Flow

1. **User Input** → Form field component
2. **Form Submission** → `useFormSubmission` hook
3. **Validation** → `validateField` utility
4. **Data Transformation** → `formDataToState` utility
5. **State Update** → `updateFormData` from context
6. **Persistence** → localStorage (debounced)
7. **Step Progression** → `setFormStep` from context

## Key Design Decisions

### Why Context API instead of Redux?

- Simple state management needs
- Form state is mostly local to the form flow
- No need for complex state management
- Context provides sufficient state sharing

### Why localStorage instead of a backend?

- Demonstrates client-side persistence
- No backend API needed for this exercise

### Why debounced localStorage writes?

- Prevents excessive writes if user double clicks submit
- Improves performance
- Reduces localStorage API calls

### Why separate validation utilities?

- Reusable across different form steps
- Easy to test in isolation
- Clear separation of concerns

## Accessibility

The application follows WCAG guidelines:

- **ARIA labels**: All form fields have proper labels
- **Keyboard navigation**: Tab navigation with Arrow keys
- **Error announcements**: Error messages use `role="alert"`
- **Semantic HTML**: Proper use of form, label, input elements
- **Focus management**: Proper focus handling in tab navigation

## Performance Considerations

1. **Memoization**: Context value is memoized to prevent unnecessary re-renders
2. **Debouncing**: localStorage writes are debounced
3. **Lazy loading**: Google Maps API is loaded only when needed

## Testing Strategy

While tests are not included in this exercise, the architecture supports:

- **Unit tests**: Utility functions (validation, formData, addressParser)
- **Component tests**: Individual components with React Testing Library
- **Integration tests**: Form flow and state management
- **E2E tests**: Complete form submission flow

## Future Improvements

1. **Error boundaries**: Add error boundaries for better error handling
2. **Testing**: Implement the testing strategy indicated above
3. **Loading states**: Add loading indicators for async operations
4. **Accessibility**: Add more ARIA attributes and screen reader support
