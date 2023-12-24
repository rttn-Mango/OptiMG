import { Link } from 'react-router-dom'

//Icons
import logo from '../Assets/logo.svg'

export default function Header(){
    return(
        <header className="header">
            <nav>
                <Link to='/' title='Back to Homepage'><img src={logo} alt="Site Logo" draggable="false" width={110} height={50}/></Link>
                <ul role='list'>
                    <li><Link to='/' title='Back to Homepage'>Homepage</Link></li>
                    <li><Link to='/compress' title='Start Compressing'>Compress</Link></li>
                    <li><Link to='/convert' title='Convert your Assets'>Convert</Link></li>
                </ul>
            </nav>
        </header>
    )
}