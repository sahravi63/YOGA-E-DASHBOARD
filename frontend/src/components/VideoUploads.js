import React, { useState } from 'react';

const VideoUpload = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setTitle('');
    setVideoFile(null);
    setPosterFile(null);
    setError(null);
    setSuccess(false);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024 * 1024) { // Limit: 100MB
      setError('Video file size should be less than 100MB');
      return;
    }
    setVideoFile(file);
    setError(null); // Clear error if valid file selected
  };

  const handlePosterFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith('image/')) {
      setError('Only image files are allowed for the poster.');
      return;
    }
    setPosterFile(file);
    setError(null); // Clear error if valid file selected
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', videoFile);
    if (posterFile) {
      formData.append('poster', posterFile);
    }

    try {
      const response = await fetch('http://localhost:5000/api/videos/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Failed to upload video');
      }

      setSuccess(true);
      resetForm(); // Reset the form fields after successful upload
      onClose(); // Close the form after successful upload
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <h2>Upload Video</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Video uploaded successfully!</div>}
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoFileChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handlePosterFileChange} // Optional poster
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default VideoUpload;
