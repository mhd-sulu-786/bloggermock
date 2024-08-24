// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Regiser';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import AddPost from './components/Addpost';
import UpdatePost from './components/Updatepost';
import AddComment from './components/Addcomment';

const App = () => {
    const [userId, setUserId] = useState(null);

    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Blog</h1>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setUserId={setUserId} />} />
                    <Route path="/profile" element={userId ? <Profile userId={userId} /> : <Login setUserId={setUserId} />} />
                    <Route path="/updateprofile" element={userId ? <UpdateProfile userId={userId} /> : <Login setUserId={setUserId} />} />
                    <Route path="/addpost" element={userId ? <AddPost userId={userId} /> : <Login setUserId={setUserId} />} />
                    <Route path="/updatepost/:id" element={userId ? <UpdatePost /> : <Login setUserId={setUserId} />} />
                    <Route path="/addcomment/:postId" element={userId ? <AddComment /> : <Login setUserId={setUserId} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
