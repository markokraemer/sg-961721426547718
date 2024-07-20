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

    const backendCode = `
// Backend code (Node.js with Express)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const items = [];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
    `;

    const frontendCode = `
// Frontend code (React)
import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    });
    const addedItem = await response.json();
    setItems([...items, addedItem]);
    setNewItem('');
  };

  return (
    <div>
      <h1>${appDescription}</h1>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
    `;

    setGeneratedCode(`
// Generated code for: ${appDescription}
${backendCode}

${frontendCode}
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