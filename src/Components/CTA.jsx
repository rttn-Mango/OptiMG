//Icon
import arrowhead from '../Assets/right.svg'

export default function CTA(){
    return (
        <>
            <p>Looking for the <span>API</span>?</p>
            <a href="">Click Here <img src={arrowhead} alt="Right arrow icon" draggable="false" width={30} height={30}/></a>
        </>
    )
}