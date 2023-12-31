import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

//Components
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
    const [compressedFile, setCompressedFile] = useState([]);
    let isLoading = useRef(null);

    //Renders all the compressed image
    const renderCompressedImages = () => {
        if(compressedFile.length === 0) return <p className="note">You haven&apos;t uploaded anything yet!</p>

        return compressedFile.map(file => {
            return(
            <div className="files__card" key={file.base64}>
                <p>{file.name}</p>
                <div className="files__card--download">
                    <p className="secondary">{file.size} ᴋʙ</p>
                    <a title="Download" download={file.name.slice(0, file.name.lastIndexOf('.'))} key={file.base64} href={`data:${file.type};base64,${file.base64}`}><img src={dl} alt="Download" draggable="false"/></a>
                </div>
            </div>
            )
        })
    }

    //For downloading all images
    const downloadAllImages = () => {
        const images = document.querySelectorAll('a');
        images.forEach(image => image.click())
    }

    useEffect(() => {

        const compressImage = async () => {
            if (uploadedFile){
                isLoading.current = true;
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

                                        //Magic formula from stackoverflow that I don't understand
                                        let newFileSize = 4 * Math.ceil((res.data.base64.length / 3))*0.5624896334383812;

                                        const compressedData = {
                                            base64: `${res.data.base64}`,
                                            type: file.type,
                                            name: file.name,
                                            size: Math.round(newFileSize/1024),
                                        }
                                        resolve(compressedData)
                                        isLoading.current = false;
                                        
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
                <DragAndDrop setUploadedFile={setUploadedFile} isLoading={isLoading}/>

                <section className="compress__hero--files"> {
                
                    isLoading.current 
                    ? 
                    <div className="promise-loading" aria-hidden='true'>
                        <p>Please Wait <span className="dot-anim">.</span> <span className="dot-anim">.</span> <span className="dot-anim">.</span></p>
                        <HashLoader color="#8aafbc"/>
                    </div> : renderCompressedImages()
                } </section>
                <button type='button' disabled={compressedFile.length <= 0 || isLoading.current ? true : false} onClick={downloadAllImages}>Download All</button>
            </section>

            <section className="compress__instruction">
                <h1> <span className="primary">How</span> to Use</h1>
                <section className="compress__instruction--card">
                    <div className="container">
                        <h2><span className="secondary">Choose</span> your Assets</h2>
                        <ul role="list">
                            <li>Click the dashed blue box to open your folder.</li>
                            <li>Select the File/s you want to optimize.</li>
                            <li>You may also Drag your files directly to the box.</li>
                        </ul>
                    </div>
                    <img src={select} draggable="false" width={510} height={350} alt="Choose Your Assets Illustration" />
                </section>

                <div className="wrapper">
                    <section className="compress__instruction--card">
                        <img src={chill} draggable="false" width={430} height={550} alt="Chill out Illustration" />
                        <div className="container">
                            <h2><span className="secondary">Chill</span> out for a bit</h2>
                            <ul role="list">
                                <li>Wait for the loading to finish.</li>
                                <li>Grab yourself a coffee and chill out for a bit.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <section className="compress__instruction--card">
                    <div className="container">
                        <h2><span className="secondary">Download</span> your files</h2>
                        <ul role="list">
                            <li>Once compression is done, click the Download button.</li>
                            <li>You may also Click the Download All button if there are more files.</li>
                        </ul>
                    </div>
                    <img src={download} draggable="false" width={510} height={380} alt="Download Illustration" />
                </section>
            </section>

            <section className="compress__closing">
                <p>It&apos;s that <span className="primary">Simple</span>!</p>
                <p>Minify simplifies the compression process, ensuring your digital assets are optimized for speed and efficiency.</p>
            </section>

            <section className="compress__cta">
                <CTA api="https://tinypng.com/developers/reference"/>
            </section>
        </main>
    )
}