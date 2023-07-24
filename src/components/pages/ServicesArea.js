import React from 'react';


export default function ServicesArea() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="site-heading text-center">
                            <span className="site-title-tagline">SERVICES</span>
                            <h2 className="site-title">What We Offer</h2>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4 ">
                        <div className="service-item" style={{ height: '100%' }}>
                            <div className="service-icon">
                                <i className="fas fa-cloud"></i>
                            </div>
                            <div className="service-content">
                                <h4>Reliable Sources</h4>
                                <p>Most reports are pulled from <a href="http://aviationweather.gov" target="_blank">NOAA ADDS</a>, the official source for aviation weather for pilots in the US with world-wide, but support exists for additional sources on a regional basis. Station information is compiled from <a href="http://ourairports.com" target="_blank">OurAirports</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="service-item" style={{ height: '100%' }}>
                            <div className="service-icon">
                                <i className="fas fa-code"></i>
                            </div>
                            <div className="service-content">
                                <h5>Data Analysis</h5>
                                <p>Reports are sanitized eliminating common errors with manual entry. Flight rules are calculated for each time period in the report. Additional features like value interpretation, translation, and text-to-speech are available per element and for the report as a whole</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="service-item" style={{ height: '100%' }}>
                            <div className="service-icon">
                                <i className="fas fa-globe fa-2x"></i>
                            </div>
                            <div className="service-content">
                                <h5>Cross-Platform</h5>
                                <p>Parsed reports are returned in JSON, XML, or YAML format, which can be imported into any language on any platform. Great for battery-conscientious mobile and IoT applications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}