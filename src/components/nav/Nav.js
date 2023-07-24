import { React, useState } from "react";
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './css/Nav.css'
import './css/Header.css'

export default function Nav() {

    const [nav, setNav] = useState('navbar navbar-expand-lg');
    const addNavClassname = () => {
        if (window.scrollY > 50) {
            setNav('navbar navbar-expand-lg fixed-top');
        } else {
            setNav('navbar navbar-expand-lg')
        }
    }
    window.addEventListener('scroll', addNavClassname)

    return (
        <header className="header">

            <div className="main-navigation">
                <nav className={nav}>
                    <div className="container g-0">
                        <Link className="navbar-brand" to="/">
                            {/* <img src={logo} alt='logo' width="30" height="24" className="d-inline-block align-text-top" />
                            <h2 className='logo-text'>Pitte<em>G</em>o
                            </h2> */}
                            <div className="logo">
                                <img src={logo} alt="logo" className="d-inline-block align-text-top" />
                                <h2 className='logo-text'>Pitte
                                    <em>G</em>
                                    o
                                </h2>
                            </div>
                        </Link>
                        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i className="fal fa-bars"></i></span>
                        </button> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="main_nav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"> HOME </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pirep"> PIREP </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/metar"> METAR </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/reports"> Other Reports </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/services"> Services </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact"> Contact </Link>
                                </li> */}
                            </ul>
                            {/* <div className="header-btn">
                                <Link className="theme-btn" to="/"> <span className="fas fa-plane-departure"></span>
                                    Book Now
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </nav>
            </div>

        </header>
    );
}
