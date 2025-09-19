import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addUser,
  clearCurrentUser,
  removeUser,
  setCurrentUser,
  updateUser
} from '../store/slices/userSlice'

const UserProfile: React.FC = () => {
  const { currentUser, users, isLoading, error } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [editingUser, setEditingUser] = useState<{ id: string; name: string; email: string } | null>(null)

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        avatar: `https://ui-avatars.com/api/?name=${newUser.name}&background=random`
      }
      dispatch(addUser(user))
      setNewUser({ name: '', email: '' })
    }
  }

  const handleSetCurrentUser = (user: any) => {
    dispatch(setCurrentUser(user))
  }

  const handleUpdateUser = () => {
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, updates: { name: editingUser.name, email: editingUser.email } }))
      setEditingUser(null)
    }
  }

  const handleDeleteUser = (id: string) => {
    dispatch(removeUser(id))
    if (currentUser?.id === id) {
      dispatch(clearCurrentUser())
    }
  }

  return (
    <div className="user-profile">
      <div className="current-user">
        <h3>Current User</h3>
        {currentUser ? (
          <div className="user-card current">
            <img src={currentUser.avatar} alt={currentUser.name} className="avatar" />
            <div>
              <h4>{currentUser.name}</h4>
              <p>{currentUser.email}</p>
            </div>
            <button onClick={() => dispatch(clearCurrentUser())}>Logout</button>
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </div>

      <div className="add-user">
        <h3>Add New User</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
      </div>

      <div className="users-list">
        <h3>All Users ({users.length})</h3>
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <div className="user-info">
              {editingUser?.id === user.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                  <button onClick={handleUpdateUser}>Save</button>
                  <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </>
              )}
            </div>
            <div className="user-actions">
              <button onClick={() => handleSetCurrentUser(user)}>Select</button>
              <button onClick={() => setEditingUser({ id: user.id, name: user.name, email: user.email })}>
                Edit
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default UserProfile
