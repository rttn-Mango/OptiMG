
//Icons
import logo from '../Assets/logo.svg'

export default function Header(){
    return(
        <header className="header">
            <nav>
                <a href=''><img src={logo} alt="Site Logo" draggable="false" width={110} height={50}/></a>
                <ul role='list'>
                    <li><a href="">Homepage</a></li>
                    <li><a href="">Compress</a></li>
                    <li><a href="">Convert</a></li>
                </ul>
            </nav>
        </header>
    )
}