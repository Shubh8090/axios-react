
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/apiService';

const UserList = ({ users, setUsers, onEditUser }) => {
  useEffect(() => {
    getUsers()
      .then(response => setUsers(response))
      .catch(error => console.error(error));
  }, [setUsers]);

  const handleDelete = async (userId) => {
    try {
      const isDeleted = await deleteUser(userId);
      if (isDeleted) {
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p className='user-item'>
              <strong>Name:</strong> {user.name}
            </p>
            <p className='user-item'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='user-item'>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className='user-item'>
              <strong>Website:</strong> {user.website}
            </p>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <button onClick={() => onEditUser(user)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;