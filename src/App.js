import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { db } from './firebase';  // Firebase connection
import { saveToLocalStorage, loadFromLocalStorage } from './storage';  // Local storage utilities
import 'draft-js/dist/Draft.css';

const App = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Load screenplay from localStorage or Firestore on mount
  useEffect(() => {
    // First, attempt to load from local storage
    const savedContent = loadFromLocalStorage('screenplay');
    if (savedContent) {
      const contentState = convertFromRaw(savedContent);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      // If nothing is in localStorage, load from Firestore
      const loadScreenplayFromFirestore = async () => {
        const doc = await db.collection('screenplays').doc('myScreenplay').get();
        if (doc.exists) {
          const contentState = convertFromRaw(doc.data().content);
          setEditorState(EditorState.createWithContent(contentState));
        }
      };
      loadScreenplayFromFirestore();
    }
  }, []);

  // Save screenplay to Firestore and localStorage whenever it changes
  const handleChange = (state) => {
    setEditorState(state);

    const contentState = state.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Save to localStorage
    saveToLocalStorage('screenplay', rawContent);

    // Save to Firestore
    saveScreenplayToFirestore(rawContent);
  };

  // Function to save to Firestore
  const saveScreenplayToFirestore = async (content) => {
    await db.collection('screenplays').doc('myScreenplay').set({ content });
  };

  return (
    <div className="App">
      <h1>Screenplay Editor</h1>
      <Editor
        editorState={editorState}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
