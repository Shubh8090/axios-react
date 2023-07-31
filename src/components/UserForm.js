
import React, { useState, useEffect } from 'react';
import { addUser, updateUser } from '../services/apiService';

const UserForm = ({ onAddUser, onUpdateUser, userToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setPhone(userToEdit.phone || '');
            setWebsite(userToEdit.website || '');
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setWebsite('');
        }
    }, [userToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (userToEdit) {
            const updatedUser = {
                ...userToEdit,
                name,
                email,
                phone,
                website,
            };
            const response = await updateUser(userToEdit.id, updatedUser);
            onUpdateUser(response);
        } else {
            const newUser = {
                name,
                email,
                phone,
                website,
            };
            const response = await addUser(newUser);
            onAddUser(response);
        }
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
        
    };

    return (
        <div>
            <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className='form-item'>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='form-item'>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='form-item'>
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className='form-item'>
                        <label>Website:</label>
                        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>





                    <button type="submit">{userToEdit ? 'Update' : 'Save'}</button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;