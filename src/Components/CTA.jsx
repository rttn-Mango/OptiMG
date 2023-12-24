import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

//Icon
import arrowhead from '../Assets/right.svg'

export default function CTA({cta}){
    return (
        <>
            <p>Looking for the <span className="secondary">API</span>?</p>
            <Link to={cta} title='Check out the Documentation'>Click Here <img src={arrowhead} alt="Right arrow icon" draggable="false" width={30} height={30}/></Link>
        </>
    )
}

CTA.propTypes = {
    cta: PropTypes.string
}