import PropTypes from 'prop-types'

//Icon
import upload from '/dlw.svg'

export default function DragAndDrop({setUploadedFile, isLoading}){
    const handleDragOver = e => e.preventDefault();
    const handleDrop = e => {
        e.preventDefault();
        isLoading.current = true;
        
        let uploadedFiles;
        if(e.dataTransfer !== undefined) uploadedFiles = e.dataTransfer.files
        else uploadedFiles = e.target.files

        //Converts the list of files to an array
        const files = Array.from(uploadedFiles);
        setUploadedFile(files);
    }

    return(
        <div
            className='drag-and-drop'
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >

            <img src={upload} alt="Upload your Files" draggable="false"  height={50} width={50}/>

            <label htmlFor="file">
                <input type="file" name="file" id="file" onChange={handleDrop}/>
                <p>Choose <span className='primary'>or</span> Drag your File/s Here</p>
            </label>
            
            <p>Currently supports <span className="secondary">JPG</span>, <span className="secondary">PNG</span>, and <span className="secondary">WebP</span></p>
        </div>
    )
}

DragAndDrop.propTypes = {
    setUploadedFile: PropTypes.func,
    isLoading: PropTypes.object,
}