import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

//Icons
import logo from '../Assets/logo.svg'
import burger from '/public/burger.svg'

export default function Header({setIsOpened}){
    const path = useLocation();

    return(
        <header className="header">
            <nav>
                <Link to='/' title='Back to Homepage'><img src={logo} alt="Site Logo" draggable="false" width={110} height={50}/></Link>
                <ul role='list'>
                    <li><Link to='/' title='Back to Homepage' className={path.pathname === '/' ? 'page | active' : 'page | inactive'}>Homepage</Link></li>
                    <li><Link to='/compress' title='Start Compressing' className={path.pathname === '/compress' ? 'page | active' : 'page | inactive'}>Compress</Link></li>
                    <li><Link to='/convert' title='Convert your Assets' className={path.pathname === '/convert' ? 'page | active' : 'page | inactive'}>Convert</Link></li>
                </ul>
                <button type="button" onClick={() => setIsOpened(true)}><img src={burger} alt="Open Nav" draggable="false" height={40} width={40}/></button>
            </nav>
        </header>
    )
}

Header.propTypes = {
    setIsOpened: PropTypes.func
}