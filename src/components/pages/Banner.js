import React from "react";
import hero from '../../assets/hero/hero.png'


// const bannerDescription = "There are many variations of passages available but the majority have suffered alteration in some form by injected humour or randomised words which don't look even slightly believable.";
const bannerDescription = "It sources reports from a variety of government sources, parses individual elements, and calculates additional information like flight rules and time range interpolation.";

export default function Banner() {
    return (
        <div className="hero-single hero-shape">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-content">
                            <h6 className="hero-sub-title wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".25s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.25s', animationName: 'fadeInUp' }}>
                                Welcome To Our AACE!
                            </h6>
                            <h1 className="hero-title wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".50s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'fadeInUp' }}>
                                Aviation weather engine.
                            </h1>
                            <p className="wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay=".75s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.75s', animationName: 'fadeInUp' }}>
                                {bannerDescription}
                            </p>
                            <div className="hero-btn wow animate__ animate__fadeInUp animated" data-wow-duration="1s" data-wow-delay="1s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '1s', animationName: 'fadeInUp' }}>
                                <a href="contact.html" className="theme-btn">Contact Us <i className="fas fa-arrow-right"></i></a>
                                <a href="about.html" className="theme-btn border-btn">About Us <i className="fas fa-arrow-right"></i></a>
                            </div>
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
    );

}