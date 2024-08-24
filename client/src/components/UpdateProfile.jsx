import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = ({ userId }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profile/${userId}`);
                const { name, password, dateofbirth } = response.data;
                setName(name);
                setPassword(password);
                setDateOfBirth(dateofbirth);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/updateprofile/${userId}`, {
                name,
                password,
                dateofbirth: dateOfBirth
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Profile update failed");
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Update Profile</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required />
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateProfile;
