import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

//Icons
import close from '/public/close.svg'

export default function Header({setIsOpened}){
    const path = useLocation();

    return(
        <>
            <nav>
                <button type="button" onClick={() => setIsOpened(false)}><img src={close} alt="Close the Menu" draggable="false" height={40} width={40}/></button>
                <ul role='list'>
                    <li><Link to='/' title='Back to Homepage' onClick={() => setIsOpened(false)} className={path.pathname === '/' ? 'page | active' : 'page | inactive'}><span>H</span>omepage</Link></li>
                    <li><Link to='/compress' title='Start Compressing' onClick={() => setIsOpened(false)} className={path.pathname === '/compress' ? 'page | active' : 'page | inactive'}><span>C</span>ompress</Link></li>
                    <li><Link to='/convert' title='Convert your Assets' onClick={() => setIsOpened(false)} className={path.pathname === '/convert' ? 'page | active' : 'page | inactive'}><span>C</span>onvert</Link></li>
                </ul>
            </nav>
        </>
    )
}

Header.propTypes = {
    setIsOpened: PropTypes.func
}