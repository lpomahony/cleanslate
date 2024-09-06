import React from 'react';

const FileOperations = ({ onFileUpload, onFileExport }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onFileUpload(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="file-operations">
      <input
        type="file"
        accept=".md"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" className="button">
        Upload Markdown
      </label>
      <button onClick={onFileExport} className="button">
        Export Markdown
      </button>
    </div>
  );
};

export default FileOperations;