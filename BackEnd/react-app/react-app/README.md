# React + Vite + TypeScript + Redux Template

A comprehensive, production-ready template featuring React 18, Vite, TypeScript, and Redux Toolkit with multiple Redux slices for state management.

## 🚀 Features

- **React 18** with TypeScript support
- **Vite** for fast development and building
- **Redux Toolkit** with multiple slices for state management
- **TypeScript** for type safety
- **ESLint** for code linting
- **Modern CSS** with responsive design
- **Three example Redux slices** demonstrating different patterns:
  - Counter slice (simple state)
  - User management slice (complex state with arrays)
  - Todo app slice (CRUD operations with filtering)

## 📦 Redux Slices Included

### 1. Counter Slice (`src/store/slices/counterSlice.ts`)
- Simple counter state management
- Actions: increment, decrement, incrementByAmount, reset, setLoading
- Demonstrates basic Redux patterns

### 2. User Slice (`src/store/slices/userSlice.ts`)
- User management with current user and user list
- Actions: setCurrentUser, addUser, removeUser, updateUser, etc.
- Demonstrates complex state with arrays and relationships

### 3. Todo Slice (`src/store/slices/todoSlice.ts`)
- Full CRUD operations for todos
- Filtering by status (all, active, completed)
- Priority levels and timestamps
- Demonstrates real-world application patterns

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Run linting:**
   ```bash
   npm run lint
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Counter.tsx      # Counter component
│   ├── UserProfile.tsx  # User management component
│   └── TodoApp.tsx      # Todo application component
├── store/               # Redux store configuration
│   ├── index.ts         # Store setup and types
│   ├── hooks.ts         # Typed Redux hooks
│   └── slices/          # Redux slices
│       ├── counterSlice.ts
│       ├── userSlice.ts
│       └── todoSlice.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
├── App.css              # App styles
└── index.css            # Global styles
```

## 🎯 Redux Patterns Demonstrated

### Basic State Management
- Simple state updates
- Action creators with payloads
- Loading states

### Complex State Management
- Nested state objects
- Array operations (add, remove, update)
- State relationships

### Real-world Patterns
- CRUD operations
- Filtering and searching
- Async operations simulation
- Error handling

## 🔧 Customization

### Adding New Slices
1. Create a new slice file in `src/store/slices/`
2. Add the reducer to the store in `src/store/index.ts`
3. Create typed hooks in `src/store/hooks.ts`
4. Use the slice in your components

### Example New Slice:
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MyState {
  data: string[]
  loading: boolean
}

const initialState: MyState = {
  data: [],
  loading: false,
}

const mySlice = createSlice({
  name: 'mySlice',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { addData, setLoading } = mySlice.actions
export default mySlice.reducer
```

## 🎨 Styling

The template includes a modern, responsive design with:
- CSS Grid and Flexbox layouts
- Hover effects and transitions
- Mobile-responsive design
- Clean, professional appearance
- Color-coded priority indicators
- Interactive form elements

## 📝 TypeScript Features

- Fully typed Redux store
- Typed action creators and reducers
- Typed component props
- Type-safe Redux hooks
- Interface definitions for all data structures

## 🚀 Performance

- Vite for fast development builds
- React 18 with concurrent features
- Optimized Redux state updates
- Efficient re-rendering patterns
- Code splitting ready

## 📚 Learning Resources

This template demonstrates:
- Modern React patterns with hooks
- Redux Toolkit best practices
- TypeScript integration
- Component composition
- State management patterns
- Form handling
- Event handling
- Responsive design

## 🤝 Contributing

Feel free to extend this template with additional features:
- Authentication slice
- API integration slice
- Theme management slice
- Notification slice
- Local storage persistence
- Middleware for logging
- DevTools integration

## 📄 License

MIT License - feel free to use this template for your projects!
