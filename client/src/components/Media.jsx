import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Media = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
      try {
        const response = await axios.get(`http://localhost:5000/ourmedia/${userId}`);
        setMedias(response.data);
      } catch (error) {
        alert('Failed to fetch media');
      }
    };
    fetchMedia();
  }, []);

  return (
    <div className="media-gallery">
      <h2>Your Media</h2>
      {medias.map((media) => (
        <div className="media-card" key={media._id}>
          <h3>{media.username}</h3>
          <p>{media.text}</p>
          {media.image && <img src={media.image} alt="media" />}
        </div>
      ))}
    </div>
  );
};

export default Media;
