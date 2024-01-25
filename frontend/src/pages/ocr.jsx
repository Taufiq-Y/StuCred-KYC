
import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Pagination.css';
import './ocr.css'

const CardReader = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [image, setImage] = useState('');
//   const [content, setContent] = useState("");
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log("m,", m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log("dataa----------------->",result.data);
        setText(result.data.text);
        toast.success("Text Extracted Successfully")
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
    <div className="card-container">
      {!isLoading && <h1>Image To Text</h1>}
      
      {isLoading && (
        <>
          <progress className="form-control" value={progress} max="100">
            {progress}%{' '}

            
          </progress>{' '}
          <p className="text-center py-0 my-0">Extracting:- {progress} %</p>
        </>
      )}
      {!isLoading && !text && (
        <>

          <input
            type="file"
            onChange={(e) =>
              setImage(URL.createObjectURL(e.target.files[0]))
            }
            className="form-control file-input"
          />
          <input
            type="button"
            onClick={handleSubmit}
            className="btn btn-convert"
            value="Convert"
          />
        </>
      )}


      {!isLoading && text && (
        <>
          <textarea
            className="form-control textarea-output"
            rows="30"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </>
      )}
    </div>
  </div>
  );
};

export default CardReader;
