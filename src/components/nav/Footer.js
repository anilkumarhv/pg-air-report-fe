import React from "react";
import logo from '../../assets/logo.png'
import './css/Footer.css'


export default function Footer() {
    return (
        <footer className="footer-area pt-100">
            <div className="footer-widget">
                <div className="container">
                    <div className="row footer-widget-wrapper pb-50">
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box about-us" style={{ textAlign: "left" }}>
                                <a href="/" className="footer-logo">
                                    <img src={logo} alt="" />
                                </a>
                                <p className="mb-20">
                                    There are many variations of the passages available the majority have suffered
                                    alteration in
                                    some form by injected humour.
                                </p>
                                <ul className="footer-social">
                                    <li><a href="#!"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#!"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#!"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list" style={{ textAlign: "left" }}>
                                <h4 className="footer-widget-title">Quick Links</h4>
                                <ul className="footer-list">
                                    <li><a href="#!">About Us</a></li>
                                    <li><a href="#!">FAQ's</a></li>
                                    <li><a href="#!">Terms Of Service</a></li>
                                    <li><a href="#!">Privacy policy</a></li>
                                    <li><a href="#!">Our Services</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box" style={{ textAlign: "left" }}>
                                <h4 className="footer-widget-title">Get Started</h4>
                                <ul className="footer-list">
                                    <li><a href="#!">Register</a></li>
                                    <li><a href="#!">Our Package</a></li>
                                    <li><a href="#!">Contact Us</a></li>
                                    <li><a href="#!">Our Services</a></li>
                                    <li><a href="#!">Careers</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box" style={{ textAlign: "left" }}>
                                <h4 className="footer-widget-title">Contact Us</h4>
                                <ul className="footer-contact">
                                    <li><i className="fas fa-map-marker-alt"></i>15/B Road, Mysore, INDIA</li>
                                    <li><a href="tel:+91935314945"><i className="fas fa-phone"></i>+91 9353149745</a></li>
                                    <li><a href="mailto:hello@pittego.com"><i className="far fa-envelope"></i>hello@pittego.com</a>
                                    </li>
                                    <li><i className="far fa-clock"></i>Mon - Fri (10AM - 08PM)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <p className="copyright-text">
                        &copy; Copyright <span id="date">2023</span> <a href="/"> Pitte<em>G</em>o </a> All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}