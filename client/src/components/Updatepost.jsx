// src/components/UpdatePost.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePost = ({ postId }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/media/${postId}`);
                setText(response.data.text);
                setImage(response.data.image);
            } catch (error) {
                console.error('Failed to fetch post', error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/ourupdatemedia/${postId}`, { text, image });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to update post', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Update your post..." required></textarea>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Update Image URL" required />
            <button type="submit">Update Post</button>
        </form>
    );
};

export default UpdatePost;
