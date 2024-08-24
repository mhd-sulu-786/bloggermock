// src/components/AddComment.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/ourupdatemedia/${postId}`, { comments: [comment] });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment..." required></textarea>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default AddComment;
