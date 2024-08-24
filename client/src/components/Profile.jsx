import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profile/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };

        fetchUser();
    }, [userId]);

    return user ? (
        <div>
            <h2>{user.name}</h2>
            <p>Date of Birth: {user.dateofbirth}</p>
            <p>Password: {user.password}</p>
            <button>Update Profile</button>
        </div>
    ) : (
        <p>Loading profile...</p>
    );
};

export default Profile;
