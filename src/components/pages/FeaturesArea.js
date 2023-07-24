import React from 'react';

// import icomoon from '../../icomoon.css';

export default function FeaturesArea() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="site-heading text-center">
                            <span className="site-title-tagline">Features</span>
                            <h2 className="site-title">Top Features</h2>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="feature-single">
                            <div className="feature-icon">
                                <i className="fas fa-cloud"></i>
                            </div>
                            <div className="feature-info">
                                <h5>PIREP</h5>
                                <p>Inflight observations meant to aid controllers and pilots routing around adverse conditions and others of note.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="feature-single">
                            <div className="feature-icon">
                                <i className="fas fa-plane-up"></i>
                            </div>
                            <div className="feature-info">
                                <h5>METAR</h5>
                                <p>Current surface conditions at an airport or other reporting location that updates every hour or earlier.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="feature-single">
                            <div className="feature-icon">
                                {/* <i className="icon-all-around-globe"></i> */}
                                <i className="fas fa-globe"></i>
                            </div>
                            <div className="feature-info">
                                <h5>Search</h5>
                                <p>Reports and stations can be returned from a text search, nearest a coordinate pair, or along a flight path.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}