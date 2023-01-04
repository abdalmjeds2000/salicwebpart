import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import jsPDF from 'jspdf';
import './PDFViewer.css';







const PDFViewer = () => {
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [textBoxes, setTextBoxes] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [image, setImage] = useState(null);





  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => { 
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });


  const pageRef = useRef(null);
  const canvasRef = useRef(null);


  function handleZoomIn() {
    setScale(scale + 0.1);
  }
  function handleZoomOut() {
    setScale(scale - 0.1);
  }

  function handleFileChange(event) {
    setImage(event.target.files[0]);
  }
  function handleDrawImage() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = () => {
      context.drawImage(img, 0, 0, img.width * imageScale, img.height * imageScale);
    };
  }

  function handlePageRender(page) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // clear the canvas
    // context.clearRect(0, 0, canvas.width, canvas.height);

    // draw a red rectangle
    context.fillStyle = '#2d6';
    context.fillRect(0, 0, 100, 100);
  }

  function handleResizeImage(event) {
    setImageScale(event.target.value);
  }



  function handleRotateLeft() {
    setRotation(rotation - 90);
  }

  function handleRotateRight() {
    setRotation(rotation + 90);
  }




  // useEffect(() => {
  //   axios.get(
  //     'https://salicapi.com/api/signature/Get?Key=cd37dded-c35d-402b-b1a3-488404bd4c6e'
  //   ).then(({ data }) => {
  //     console.log(data);
  //     var reader = new FileReader();
  //     reader.readAsArrayBuffer(b64toBlob(data.data.Document.data, 'application/pdf'));
  //     reader.onload = () => {
  //       console.log(reader);
  //       setFile(reader.result)
  //     }
  //   })
  // }, [])


  function handleAddTextBox() {
    // const canvas = canvasRef.current;
    // const context = canvas.getContext('2d');

    const textBox = {
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      text: '',
    };
    setTextBoxes([...textBoxes, textBox]);
  }

  function handleDeleteTextBox(index) {
    setTextBoxes(textBoxes.filter((_, i) => i !== index));
  }



  function onItemClick({ pageNumber: itemPageNumber }) {
    setCurrentPage(itemPageNumber);
  }


  return (
    <div id='my-pdf'>
      <div id='viewer-container'>
        {file && (
          <>
            <div id='document-thumbnails'>
              <Document file={file} onLoadSuccess={({ numPages }) => setPageNumbers(Array.from(new Array(numPages), (x, i) => i + 1))}>
                {pageNumbers.map((pageNumber) => (
                  <span className='thumb-span'>
                    <Page
                      key={pageNumber}
                      pageNumber={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      scale={0.25}
                      renderTextLayer={false}
                      renderMode="svg"
                    />
                  </span>
                ))}
              </Document>
            </div>
            <div id='document-viewer'>
              <Document
                file={file || ''}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="WAAAIT" /* loader for document loading */
                renderMode="canvas"
                onItemClick={onItemClick}
              >
                <Outline onItemClick={onItemClick} />
                <Page 
                  key={currentPage * Math.floor(Math.random() * 1000) + 1}
                  ref={pageRef} 
                  pageNumber={currentPage} 
                  loading="XXXXXXXXXXXXXXXXXXXX" /* loader for page loading */
                  scale={scale} 
                  // renderTextLayer={false} /* to disable text selection */
                  canvasRef={canvasRef} 
                  onRenderSuccess={handlePageRender}
                  rotate={rotation}
                  // customTextRenderer={textRenderer}
                />
              </Document>
            </div>
          </>
        )}
      </div>

      <div>
        <input type="file" onChange={onFileChange} accept="application/pdf" />

        <br />
        <br />
        <br />

        <div>
          <button onClick={() => currentPage > 1 ? setCurrentPage(prev => prev - 1) : null}>Previos Page</button>
          <button onClick={() => currentPage < numPages ? setCurrentPage(prev => prev + 1) : null}>Next Page</button>
          <button onClick={() => setCurrentPage(1)}>First Page</button>
          <button onClick={() => setCurrentPage(numPages)}>Last Page</button>
          
          
          <br />
          
          <button onClick={handleZoomOut}>Zoom Out</button>
          <button onClick={handleZoomIn}>Zoom In</button>


          <br />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="resize">Resize:</label>
          <input type="range" min="0.1" max="2" step="0.1" value={imageScale} onChange={handleResizeImage} />
          <button onClick={handleDrawImage}>Draw Image</button>

          <br />

          <button onClick={handleRotateLeft}>Rotate Left</button>
          <button onClick={handleRotateRight}>Rotate Right</button>

          <br />


          <button onClick={handleAddTextBox}>Add Text Box</button>
          {textBoxes.map((textBox, index) => (
            <div key={index}>
              <div
                contentEditable
                style={{
                  position: 'absolute',
                  top: textBox.y,
                  left: textBox.x,
                  width: textBox.width,
                  height: textBox.height,
                  border: '1px solid black',
                }}
                onInput={(event) => {
                  const newText = event.target.innerText;
                  setTextBoxes(
                    textBoxes.map((tb, i) => (i === index ? { ...tb, text: newText } : tb)),
                  );
                }}
              />
              <span>{textBox.text}</span>
              <button onClick={() => handleDeleteTextBox(index)}>Delete</button>
              
            </div>
          ))}
          

        </div>
      </div>

    </div>
  )
}

export default PDFViewer