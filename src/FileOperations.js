import React from 'react';
import { jsPDF } from "jspdf";

const FileOperations = ({ onFileUpload, onFileExport, rawText, formattedScript }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onFileUpload(e.target.result);
      reader.readAsText(file);
    }
  };

  const handlePdfExport = () => {
    const doc = new jsPDF({
      unit: 'in',
      format: 'letter',
      lineHeight: 2
    });
    
    doc.setFont("Courier");
    doc.setFontSize(12);

    let pageNumber = 1;
    let y = 1; // Start 1 inch from top of page
    const leftMargin = 1.5; // Left margin is 1.5 inches
    const pageWidth = 8.5; // Letter size width
    const lineHeight = 1/6; // 1/6 inch, standard for 12pt Courier
    let lastElementType = '';

    const addPageNumber = () => {
      doc.setFont("Courier", "normal");
      doc.setFontSize(12);
      doc.text(`${pageNumber}.`, 8, 0.5, { align: "right" });
      pageNumber++;
    };

    // Extract title page information
    const titlePageInfo = {};
    const lines = rawText.split('\n');
    let titlePageEnd = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        titlePageEnd = i;
        break;
      }
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        titlePageInfo[key.toLowerCase()] = value;
      }
    }

    const addTitlePage = () => {
      let y = 3;
      doc.setFont("Courier", "bold");
      doc.text(titlePageInfo.title || "Untitled", 4.25, y, { align: "center" });
      y += 1;
      doc.setFont("Courier", "normal");
      if (titlePageInfo.credit) {
        doc.text(titlePageInfo.credit, 4.25, y, { align: "center" });
        y += 0.5;
      }
      if (titlePageInfo.author) {
        doc.text(titlePageInfo.author, 4.25, y, { align: "center" });
        y += 0.5;
      }
      if (titlePageInfo.source) {
        doc.text(titlePageInfo.source, 4.25, y, { align: "center" });
        y += 0.5;
      }
      if (titlePageInfo['draft date']) {
        doc.text(titlePageInfo['draft date'], 4.25, y, { align: "center" });
        y += 0.5;
      }
      if (titlePageInfo.contact) {
        const contactLines = titlePageInfo.contact.split('\n');
        y = 8; // Move contact info to bottom of page
        contactLines.forEach(line => {
          doc.text(line.trim(), 1.5, y);
          y += 0.3;
        });
      }
      doc.addPage();
    };

    const addNewPage = () => {
      if (lastElementType === 'dialogue') {
        doc.setFont("Courier", "bold");
        doc.text("(CONTINUED)", 7.5, 10, { align: "right" });
      }
      doc.addPage();
      y = 1;
      addPageNumber();
      if (lastElementType === 'dialogue') {
        doc.setFont("Courier", "bold");
        doc.text("CONTINUED:", leftMargin, y);
        y += lineHeight * 2;
      }
    };

    addTitlePage();
    addPageNumber();

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(formattedScript, 'text/html');
    const elements = htmlDoc.body.children;

    Array.from(elements).forEach(element => {
      switch(element.tagName) {
        case 'H3': // Scene Heading
          if (y > 9.5) addNewPage();
          doc.setFont("Courier", "bold");
          doc.text(leftMargin, y, element.textContent.toUpperCase());
          y += lineHeight * 2; // Double space after scene heading
          lastElementType = 'scene';
          break;
        case 'P': // Action or Transition
          doc.setFont("Courier", "normal");
          if (element.classList.contains('transition')) {
            // Handle transition
            if (y > 9.5) addNewPage();
            doc.setFont("Courier", "bold");
            doc.text(6, y, element.textContent.toUpperCase(), { align: "right" });
            y += lineHeight * 3; // Triple space after transition
            lastElementType = 'transition';
          } else {
            // Regular action
            const actionLines = doc.splitTextToSize(element.textContent, pageWidth - leftMargin - 1);
            actionLines.forEach(line => {
              if (y > 10) addNewPage();
              doc.text(leftMargin, y, line);
              y += lineHeight * 2; // Double-spaced
            });
            lastElementType = 'action';
          }
          break;
        case 'DIV': // Dialogue block
          if (element.classList.contains('dialogue')) {
            const character = element.querySelector('h4');
            const dialogue = element.querySelector('p');
            const parenthetical = element.querySelector('.parenthetical');
            if (character) {
              if (y > 9.5) addNewPage();
              doc.setFont("Courier", "bold");
              doc.text(3.7, y, character.textContent.toUpperCase());
              y += lineHeight * 2;
            }
            if (parenthetical) {
              if (y > 10) addNewPage();
              doc.setFont("Courier", "normal");
              doc.text(3, y, `(${parenthetical.textContent})`);
              y += lineHeight * 2;
            }
            if (dialogue) {
              doc.setFont("Courier", "normal");
              const dialogueLines = doc.splitTextToSize(dialogue.textContent, 3.5);
              dialogueLines.forEach(line => {
                if (y > 10) addNewPage();
                doc.text(2.5, y, line);
                y += lineHeight * 2;
              });
            }
            lastElementType = 'dialogue';
          }
          break;
      }
    });

    doc.save("screenplay.pdf");
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
      <button onClick={handlePdfExport} className="button">
        Export PDF
      </button>
    </div>
  );
};

export default FileOperations;