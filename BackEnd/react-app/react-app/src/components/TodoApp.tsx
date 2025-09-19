import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Todo } from '../store/slices/todoSlice'
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  setFilter,
  toggleTodo,
  updateTodo
} from '../store/slices/todoSlice'

const TodoApp: React.FC = () => {
  const { todos, filter, isLoading, error } = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()
  const [newTodoText, setNewTodoText] = useState('')
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [editingTodo, setEditingTodo] = useState<{ id: string; text: string } | null>(null)

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
    case 'active':
      return !todo.completed
    case 'completed':
      return todo.completed
    default:
      return true
    }
  })

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo({ text: newTodoText, priority: newTodoPriority }))
      setNewTodoText('')
    }
  }

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const handleUpdateTodo = () => {
    if (editingTodo && editingTodo.text.trim()) {
      dispatch(updateTodo(editingTodo))
      setEditingTodo(null)
    }
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo({ id: todo.id, text: todo.text })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
    case 'high': return '#ff4444'
    case 'medium': return '#ffaa00'
    case 'low': return '#44ff44'
    default: return '#666'
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="todo-app">
      <div className="todo-header">
        <h3>Todo App</h3>
        <div className="todo-stats">
          <span>Total: {todos.length}</span>
          <span>Active: {activeCount}</span>
          <span>Completed: {completedCount}</span>
        </div>
      </div>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <select
          value={newTodoPriority}
          onChange={(e) => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <div className="todo-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => dispatch(setFilter('all'))}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => dispatch(setFilter('active'))}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch(setFilter('completed'))}
        >
          Completed
        </button>
        <button onClick={() => dispatch(clearCompleted())}>
          Clear Completed
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <div className="todo-text">
                {editingTodo?.id === todo.id ? (
                  <input
                    type="text"
                    value={editingTodo.text}
                    onChange={(e) => setEditingTodo({ ...editingTodo, text: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateTodo()}
                    onBlur={handleUpdateTodo}
                    autoFocus
                  />
                ) : (
                  <span onDoubleClick={() => handleEditTodo(todo)}>
                    {todo.text}
                  </span>
                )}
              </div>
              <div
                className="priority-indicator"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
                title={`${todo.priority} priority`}
              />
            </div>
            <div className="todo-actions">
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <p className="no-todos">
            {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
          </p>
        )}
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default TodoApp
