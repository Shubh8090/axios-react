// App.js
import React, { useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './style.css'

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null); // Add this line to define the state for userToEdit

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setUserToEdit(null); // Reset userToEdit state after updating the user
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
  };

  return (
    <div className="App">
      <UserList
        users={users}
        setUsers={setUsers}
        onEditUser={handleEditUser}
      />
      <UserForm
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        userToEdit={userToEdit}
      />
    </div>
  );
}

export default App;