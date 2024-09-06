import React, { useState, useEffect } from 'react';
import { Fountain } from 'fountain-js';
import './App.css';
import FileOperations from './FileOperations';

console.log('THIS IS A TEST LOG FROM APP.JS');

function App() {
  const [rawText, setRawText] = useState("");
  const [formattedScript, setFormattedScript] = useState("");

  useEffect(() => {
    // Set default content with title page when component mounts
    const defaultContent = `Title: Your Screenplay Title
Credit: Written by
Author: Your Name
Source: Story by...
Draft date: ${new Date().toLocaleDateString()}
Contact:
    Your Name
    your@email.com
    (123) 456-7890


EXT. MANHATTAN - DAY

JESSE steps out of a taxi.

JESSE
(yelling)
It's good to be alive!

`;
    setRawText(defaultContent);
    updateFormattedScript(defaultContent);
  }, []);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setRawText(inputText);
    updateFormattedScript(inputText);
  };

  const updateFormattedScript = (text) => {
    let fountain = new Fountain();
    const parsedOutput = fountain.parse(text);
    setFormattedScript(parsedOutput.html.script);
    console.log('Updated formatted script:', parsedOutput.html.script);
  };

  const handleFileUpload = (content) => {
    setRawText(content);
    updateFormattedScript(content);
  };

  const handleFileExport = () => {
    const element = document.createElement("a");
    const file = new Blob([rawText], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "screenplay.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="App">
      <h1>CleanSlate</h1>
      <FileOperations 
        onFileUpload={handleFileUpload} 
        onFileExport={handleFileExport}
        rawText={rawText}
        formattedScript={formattedScript}
      />
      <div className="editor-container">
        <div className="input-panel">
          <textarea
            value={rawText}
            onChange={handleInputChange}
            placeholder="Type your screenplay here..."
          />
        </div>
        <div className="output-panel">
          <div
            className="formatted-script"
            dangerouslySetInnerHTML={{ __html: formattedScript }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;