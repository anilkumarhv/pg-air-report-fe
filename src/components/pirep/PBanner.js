import React from "react";
import hero from '../../assets/hero/hero.png';
import './PBanner.css'

const pBannerdescription = "A PIREP (Pilot Report) is an observation made by pilots inflight meant to aid controllers and pilots routing around adverse conditions and other conditions of note. They typically contain icing, turbulance, cloud types/bases/tops, and other info at a known distance and radial from a ground station. They are released as they come in.";

export default function PBanner() {
    return (
        <>
            <div className="hero-single phero-shape" style={{ paddingTop: '150px' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="hero-content">
                                <h6 className="hero-sub-title wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".25s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.25s', animationName: 'fadeInUp' }}>
                                    {/* Welcome To Our AACE! */}
                                </h6>
                                <h1 className="hero-title wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".50s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'fadeInUp' }}>
                                    PIREP
                                </h1>
                                <p className="wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".75s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.75s', animationName: 'fadeInUp' }}>
                                    {pBannerdescription}
                                </p>
                                {/* <div className="hero-btn wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay="1s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '1s', animationName: 'fadeInUp' }}>
                                    <a href="contact.html" className="theme-btn">Contact Us <i className="fas fa-arrow-right"></i></a>
                                    <a href="about.html" className="theme-btn border-btn">About Us <i className="fas fa-arrow-right"></i></a>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-img">
                                <img src={hero} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}