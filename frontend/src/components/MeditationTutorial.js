import React, { useState, useEffect } from 'react';

const MeditationTutorial = () => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tutorials/tutorial-steps');
        if (!response.ok) {
          throw new Error('Failed to fetch tutorial steps.');
        }
        const data = await response.json();
        setSteps(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const completeStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Reset to the first step when all steps are completed
      setCurrentStep(0);
    }
    // Logic to save progress in the database can be added here
  };

  if (loading) {
    return <div>Loading tutorial steps...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (steps.length === 0) {
    return <div>No tutorial steps available.</div>;
  }

  return (
    <div>
      <h2>Meditation Tutorial</h2>
      <div>
        <h3>{steps[currentStep].title}</h3>
        <p>{steps[currentStep].description}</p>
        {steps[currentStep].mediaUrl ? (
          <video controls src={`http://localhost:5000/${steps[currentStep].mediaUrl}`} />
        ) : (
          <p>No media available for this step.</p>
        )}

        <div>
          <button
            onClick={completeStep}
            disabled={currentStep >= steps.length - 1}
          >
            {currentStep >= steps.length - 1 ? 'Restart Tutorial' : 'Next'}
          </button>
        </div>

        <p>Step {currentStep + 1} of {steps.length}</p>
      </div>
    </div>
  );
};

export default MeditationTutorial;
