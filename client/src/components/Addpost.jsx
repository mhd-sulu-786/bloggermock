// src/components/AddPost.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPost = ({ userId }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/postmedia', { username: 'Username', text, comments: [], image, userId });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to add post', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write something..." required></textarea>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default AddPost;
