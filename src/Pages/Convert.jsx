import { useEffect, useState } from "react";
import axios from 'axios';

//Components
import DragAndDrop from "../Components/DragAndDrop";

//Icon
import dl from '/dl.svg'

export default function Convert(){
    const [fileToConvert, setFileToConvert] = useState(null)
    const [convertedFile, setConvertedFile] = useState([])
    const [formatToConvert, setFormatToConvert] = useState('')
    const [isDisabled, setIsDisabled] = useState(false);

    //Renders all the converted image/s
    const renderCompressedImages = () => {
        if(convertedFile.length === 0) return <p>Upload your image/s</p>

        return convertedFile.map((file, index) => {
            return(
            <div className="files__card" key={index}>
                <p>{file.name.slice(0, file.name.lastIndexOf('.'))}</p>
                <a title="Download" download={file.name.slice(0, file.name.lastIndexOf('.'))} href={`data:image/${file.format};base64,${file.base64}`}><img src={dl} alt="Download" draggable="false"/></a>
            </div>
            )
        })
    }

    useEffect(() => {
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

        convertImage()
    }, [formatToConvert, fileToConvert])

    return(
        <main className="compress">

            <DragAndDrop setUploadedFile={setFileToConvert}/>
            <label htmlFor="formats"></label>
            <select disabled={isDisabled} name="formats" id="formats" defaultValue={'default'} onChange={e => setFormatToConvert(e.target.value)}>
                <option disabled value='default'>Choose...</option>
                <option value="webp">WebP</option>
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
            </select>
            
            {renderCompressedImages()}
        </main>
    )
}