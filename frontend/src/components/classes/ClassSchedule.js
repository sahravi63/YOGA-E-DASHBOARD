import React, { useState, useEffect } from 'react';
const BASE_URL = 'http://localhost:5000'; // Define this in a config file


const ClassSchedule = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/class-schedule`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <div>Loading classes...</div>;

  return (
    <div>
      <h2>Upcoming Live Classes</h2>
      <ul>
        {classes.map(cls => (
          <li key={cls._id}>
            <h3>{cls.title}</h3>
            <p>{new Date(cls.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassSchedule;
