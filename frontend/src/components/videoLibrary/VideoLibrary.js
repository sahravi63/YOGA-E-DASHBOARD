import React, { useState, useEffect } from 'react';

const VideoLibrary = ({ refreshTrigger }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/video-library', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again.');
        } else {
          throw new Error('Failed to fetch videos');
        }
      }

      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [refreshTrigger]); // Re-fetch videos when refreshTrigger changes

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  if (videos.length === 0) return <p>No videos found in the library.</p>;

  return (
    <div>
      <h2>Video Library</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id} style={{ marginBottom: '20px' }}>
            <h3>{video.title}</h3>
            <video controls style={{ width: '100%', maxWidth: '600px' }} src={video.path} /> {/* Use Cloudinary URL */}
            {video.poster && (
              <img src={video.poster} alt="Video Poster" style={{ width: '200px', marginTop: '10px' }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoLibrary;
