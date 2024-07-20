import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appDescription, setAppDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState([]);

  const generateCode = async () => {
    setIsGenerating(true);
    setGenerationSteps([]);
    
    // Simulate API call with multiple steps
    const steps = [
      "Analyzing app description...",
      "Generating database schema...",
      "Creating API endpoints...",
      "Building frontend components...",
      "Integrating backend and frontend...",
      "Optimizing performance...",
      "Finalizing application..."
    ];

    for (let step of steps) {
      setGenerationSteps(prev => [...prev, step]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setGeneratedCode(`
// Generated code for: ${appDescription}
import React from 'react';
import { useState, useEffect } from 'react';

function GeneratedApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulated API call
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Generated App</h1>
      <p className="mb-4">This is a placeholder for your generated app based on the description: ${appDescription}</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GeneratedApp;
    `);
    setIsGenerating(false);
  };

  return (
    <AppContext.Provider value={{
      appDescription,
      setAppDescription,
      generatedCode,
      isGenerating,
      generateCode,
      generationSteps
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}