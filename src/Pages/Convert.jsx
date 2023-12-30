import { useEffect, useState } from "react";
import axios from 'axios';

//Components
import DragAndDrop from "../Components/DragAndDrop";
import CTA from "../Components/CTA";

//Icon
import dl from '/dl.svg'
import error from '../Assets/Error.svg';

//Illustrations
import select from '../Assets/select.svg'
import change from '../Assets/change.svg'
import chill from '../Assets/chill.svg'
import download from '../Assets/download.svg'



export default function Convert(){
    const [fileToConvert, setFileToConvert] = useState(null)
    const [convertedFile, setConvertedFile] = useState([])
    const [formatToConvert, setFormatToConvert] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);

    //Renders all the converted image/s
    const renderconvertedImages = () => {
        if(convertedFile.length === 0) return <p className="note">Choose a Format First before Uploading Your Assets.</p>

        return convertedFile.map((file, index) => {
            return(
            <div className="files__card" key={index}>
                <p>{file.name.slice(0, file.name.lastIndexOf('.'))}</p>
                <a title="Download" download={file.name.slice(0, file.name.lastIndexOf('.'))} href={`data:image/${file.format};base64,${file.base64}`}><img src={dl} alt="Download" draggable="false"/></a>
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
        const dndCaption = document.querySelector('.caption');

        //Fetch request
        const convertImage = async () => {
            if(fileToConvert){
                try{
                    //Disables the select option when files are being converted
                    setIsDisabled(true);
                    const droppedFiles = await Promise.all(
                        fileToConvert.map(async file => {
                            const reader = new FileReader();
                            const originalFormat = file.type;

                            return new Promise((resolve, reject) => {
                                reader.onload = async () => {
                                    const base64Data = reader.result.split(',')[1];

                                    if (!base64Data) {
                                        reject(new Error("Failed to read file as base64"));
                                        return
                                    }

                                    try{
                                        const res = await  axios.post('https://minify-backend.onrender.com/convert', {base64Data, originalFormat, formatToConvert})

                                        //Get the converted base64 response and use it on the href attribute, along with the name and selected format on the select option
                                        const convertedData = {
                                            base64: res.data.base64,
                                            name: file.name,
                                            format: res.data.format,
                                        }

                                        //Resolve the promise
                                        resolve(convertedData)

                                        //Remove the converted files from the filesToConvert array
                                        fileToConvert.pop(file)
                                    }catch(e) {reject(e)}
                                }
                                reader.readAsDataURL(file)
                            })
                        })
                    )

                    setConvertedFile(previousFiles => [
                        ...previousFiles,
                        ...droppedFiles
                    ])

                    setIsDisabled(false)
                }catch (e) {console.error(`Conversion Failed: ${e.message}`)}
            }
        }

        if(fileToConvert !== null && formatToConvert === ''){
            setFileToConvert(null)
            dndCaption.classList.add('show')
            setTimeout(() => {
                dndCaption.classList.remove('show')
                
            }, 3000)
            return
        }

        convertImage()
        
    }, [formatToConvert, fileToConvert])

    return(
        <main className="convert">

            <section className="convert__hero">
                    <p aria-hidden='true' className='caption'><img src={error} alt="Warning!" width={13} height={13}/> Please Choose a Format Below First!</p>
                    <DragAndDrop setUploadedFile={setFileToConvert}/>
                <section className="convert__hero--files">{renderconvertedImages()}</section>

                <section className="convert__hero--buttons">
                    <section className="buttons__select">
                        <label htmlFor="formats"> Convert to:</label>

                        <select disabled={isDisabled} name="formats" id="formats" defaultValue={'default'} onChange={e => setFormatToConvert(e.target.value)}>
                            <option disabled value='default'>Choose...</option>
                            <option value="webp">WebP</option>
                            <option value="jpeg">JPG</option>
                            <option value="png">PNG</option>
                        </select>
                    </section>

                    <button type='button' disabled={convertedFile.length <= 0 ? true : false} onClick={downloadAllImages}>Download All</button>
                </section>
            </section>
            


            <section className="convert__instruction">
                <h1> <span className="primary">How</span> to Use</h1>
                <section className="convert__instruction--card">
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
                    <section className="convert__instruction--card">
                        <div className="container">
                            <h2><span className="secondary">Choose</span> a File Type</h2>
                            <ul role="list">
                                <li>Choose a Format by clicking the drop down button.</li>
                            </ul>
                        </div>
                        <img src={change} draggable="false" width={510} height={300} alt="Choose a Format Illustration" />
                    </section>
                </div>

                <section className="convert__instruction--card">
                    <div className="container">
                        <h2><span className="secondary">Chill</span> out for a bit</h2>
                        <ul role="list">
                            <li>Wait for the loading to finish.</li>
                            <li>Grab yourself a coffee and chill out for a bit.</li>
                        </ul>
                    </div>
                    <img src={chill} draggable="false" width={430} height={550} alt="Chill out Illustration" />
                </section>

                <div className="wrapper">
                    <section className="convert__instruction--card">
                        <div className="container">
                            <h2><span className="secondary">Download</span> your files</h2>
                            <ul role="list">
                                <li>Once convertion is done, click the Download button.</li>
                                <li>You may also Click the Download All button if there are more files.</li>
                            </ul>
                        </div>
                        <img src={download} draggable="false" width={510} height={380} alt="Download Illustration" />
                    </section>
                </div>
            </section>

            <section className="convert__closing">
                <p>It&apos;s that <span className="primary">Simple</span>!</p>
                <p>Minify simplifies the convertion process, ensuring your digital assets are optimized for speed and efficiency.</p>
            </section>

            <section className="convert__cta">
                <CTA api='https://api.cloudmersive.com/docs/convert.asp'/>
            </section>
        </main>
    )
}