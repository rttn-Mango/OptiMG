import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import logo from '../Assets/logo.svg'

export default function Footer(){
    return(
        <footer className="footer">
            <nav>
                <div className="footer__logo">
                    <a href="" title="Back to homepage"><img src={logo} alt="Site Logo" /></a>
                    <p><span>rttn.Mango</span> © 2023</p>
                </div>

                <div className="footer__links">
                    <p>Links</p>
                    <ul role="list">
                        <li><a href="">Homepage</a></li>
                        <li><a href="">Compress</a></li>
                        <li><a href="">Convert</a></li>
                    </ul>
                </div>

                <div className="footer__socials">
                    <p>Socials</p>
                    <a href="" title="Facebook"><FaFacebookSquare/></a>
                    <a href="" title="Github"><FaGithubSquare/></a>
                    <a href="" title="Linkedin"><FaLinkedin/></a>
                </div>
            </nav>
        </footer>
    )
}