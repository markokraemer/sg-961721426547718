import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [appDescription, setAppDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCode = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedCode(`
// Generated code for: ${appDescription}
import React from 'react';

function GeneratedApp() {
  return (
    <div>
      <h1>Generated App</h1>
      <p>This is a placeholder for your generated app based on the description: ${appDescription}</p>
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
      generateCode
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}