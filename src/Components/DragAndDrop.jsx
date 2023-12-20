import PropTypes from 'prop-types'

export default function DragAndDrop({setUploadedFile}){
    const handleDragOver = e => e.preventDefault();
    const handleDrop = e => {
        e.preventDefault();

        //Converts the list of files to an array
        const files = Array.from(e.dataTransfer.files);
        setUploadedFile(files);
    }

    return(
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{width: '200px', border: '1px solid black', height: '200px'}}
        >
                    
            <p aria-label="Drag or Select Files">Drag <span>or</span> Select file/s</p>
        </div>
    )
}

DragAndDrop.propTypes = {
    setUploadedFile: PropTypes.func
}