import { useEffect, useState } from "react";
import axios from 'axios';

//Component
import CTA from "../Components/CTA";
import DragAndDrop from "../Components/DragAndDrop";

//Illustrations
import select from '../Assets/select.svg'
import chill from '../Assets/chill.svg'
import download from '../Assets/download.svg'

//Icon
import dl from '/dl.svg'

export default function Compress(){
    const [uploadedFile, setUploadedFile] = useState(null)
    const [compressedFile, setCompressedFile] = useState([])

    //Renders all the compressed image
    const renderCompressedImages = () => {
        if(compressedFile.length === 0) return <p>Upload your image/s</p>

        return compressedFile.map(file => {
            return(
            <div key={file.base64}>
                <p>{file.name}</p>
                <a title="Compressed Image" download={file.name} key={file.base64} href={`data:${file.type};base64,${file.base64}`}>{dl}</a>         
            </div>
            )
        })
    }

    //For downloading all images when Download All button is clicked
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
                                        const res = await axios.post(`https://minify-backend.onrender.com/compressed`, {base64Data});
                                        const compressedData = {
                                            base64: `${res.data.base64}`,
                                            type: file.type,
                                            name: file.name,
                                            size: file.size,
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

    return(
        <main className="compress">
            <section className="compress__hero">
                <DragAndDrop setUploadedFile={setUploadedFile}/>

                <section className="compress__hero--files"> {renderCompressedImages()} </section>
                <button type='button' onClick={downloadAllImages}>Download All</button>
            </section>

            <section className="compress__instruction">
                <h1>How to Use</h1>
                <section className="compress__instruction--card">
                    <>
                        <h2>Choose your Assets</h2>
                        <ul role="list">
                            <li>Click the dashed blue box to open your folder.</li>
                            <li>Select the File/s you want to optimize.</li>
                            <li>You may also Drag your files directly to the box.</li>
                        </ul>
                    </>
                    <img src={select} draggable="false" width={510} height={350} alt="Choose Your Assets Illustration" />
                </section>

                <section className="compress__instruction--card">
                    <>
                        <h2>Chill out for a bit</h2>
                        <ul role="list">
                            <li>Wait for the loading to finish.</li>
                            <li>Grab yourself a coffee and chill out for a bit.</li>
                        </ul>
                    </>
                    <img src={chill} draggable="false" width={430} height={550} alt="Chill out Illustration" />
                </section>

                <section className="compress__instruction--card">
                    <>
                        <h2>Download your files</h2>
                        <ul role="list">
                            <li>Once compression is done, click the Download button.</li>
                            <li>You may also Click the Download All button if there are more files.</li>
                        </ul>
                    </>
                    <img src={download} draggable="false" width={510} height={380} alt="Download Illustration" />
                </section>
            </section>

            <section className="compress__closing">
                <p aria-label="It's that Simple!">It&apos;s that <span>Simple</span>!</p>
                <p>Minify simplifies the compression process, ensuring your digital assets are optimized for speed and efficiency.</p>
            </section>

            <section className="compress__cta">
                <CTA/>
            </section>
        </main>
    )
}