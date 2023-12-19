import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [compressedFile, setCompressedFile] = useState([])

  const handleDragOver = e => e.preventDefault();
  const handleDrop = e => {
    e.preventDefault();

    //Converts the list of files to an array
    const files = Array.from(e.dataTransfer.files);
    setUploadedFile(files);
  }

  const renderImages = () => {
    if(compressedFile.length === 0) return <p>Upload your image/s</p>
    return compressedFile.map(file => <a title="Compressed Image" download key={file.base64} href={`data:${file.type};base64,${file.base64}`}>Download File</a>)
  }

  const downloadAllImages = () => {
    const images = document.querySelectorAll('a');
    
    images.forEach(image => image.click())
  }

  useEffect(() => {
    
    const compressImage = async () => {
      if (uploadedFile){

        try {
          const compressedImagesArray = await Promise.all(
            
            //Map through the array of files to compress each image
            uploadedFile.map(async file => {
              const reader = new FileReader();
  
              return new Promise((resolve, reject) => {
                reader.onload = async () => {
                  const base64Data = reader.result.split(',')[1];
  
                  if (!base64Data) {
                    reject(new Error("Failed to read file as base64"));
                    return
                  }
      
                  try{
                    const res = await axios.post(`http://localhost:3000/compressed`, {base64Data});
                    const compressedData = {
                      base64: `${res.data.base64}`,
                      type: file.type
                    }
                    resolve(compressedData)
                  }catch (e) {reject(e)}
                }
                
                reader.readAsDataURL(file)
              })
  
            })
          )
  
          setCompressedFile(previousCompressedFiles => {
            return [
              ...previousCompressedFiles,
              ...compressedImagesArray
            ]
          })

        }catch (e) {console.error(`Compression Failed: ${e.message}`)}

      }
    }

    compressImage();

  }, [uploadedFile])

  return (
    
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{width: '200px', border: '1px solid black', height: '200px'}}
      >
        
        Drag and Drop files
      </div>

      {renderImages()}
      <button type='button' onClick={downloadAllImages}>Download All</button>
    </>
  )
}

export default App
