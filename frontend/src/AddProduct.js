import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('poster', poster);
    formData.append('video', video);

    try {
      const response = await fetch('http://localhost:5000/api/products/add-product', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Token for admin
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Product added successfully');
        setError('');
      } else {
        setError(data.error);
        setSuccess('');
      }
    } catch (error) {
      setError('Failed to add product');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Product Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="file" onChange={(e) => setPoster(e.target.files[0])} accept="image/*" required />
      <input type="file" onChange={(e) => setVideo(e.target.files[0])} accept="video/*" required />
      <button type="submit">Add Product</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default AddProduct;
