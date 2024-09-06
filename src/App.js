import React, { useState } from 'react';
import { Fountain } from 'fountain-js';
import './App.css';

function App() {
  const [rawText, setRawText] = useState("");
  const [formattedScript, setFormattedScript] = useState("");

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setRawText(inputText);

    let fountain = new Fountain();
    const parsedOutput = fountain.parse(inputText);

    console.log(parsedOutput.html.script); // Log the parsed HTML structure to console

    setFormattedScript(parsedOutput.html.script);
  };

  return (
    <div className="App">
      <h1>Screenplay Editor</h1>
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
