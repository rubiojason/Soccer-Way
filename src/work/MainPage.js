import React, { useEffect, useState, useRef } from 'react'; 
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from 'gsap'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchTeams } from '../redux'; 

function MainPage({ fetchTeams, teamName, teamVenue }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //const tl = new TimelineLite({ repeat: -1 }); 

    //useState
    //const [info, setInfo] = useState([]); 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    //useEffect 
    useEffect(() => {
        fetchTeams(); 
    }, [fetchTeams])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    //functions 
    const handleNavOpen = () => {
        setNavDisplay("flex"); 
        gsap.to(pageWidthAnim.current, {marginRight: "100vw"}); 
        gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "55vw", right: "0%", backgroundColor: "rgb(58, 43, 88)", display: "flex", flexDirection: "column"});
        gsap.fromTo(backgroundNavAnim.current, {width: "100vw", height: "100vh"}, {display: "flex", backgroundColor: "rgba(0, 0, 0, 0.4)", width: "100vw", height: "100vh", position: "absolute", opacity: 1, zIndex: 999}); 
        setScrollState("hidden"); 
    }

    const handleNavClose = () => {
        setNavDisplay("none")
        gsap.to(pageWidthAnim.current, {marginRight: "0px"}); 
        gsap.to(navWidthAnim.current, {width: "0px"}); 
        gsap.to(backgroundNavAnim.current, {opacity: 0, display: "none"}); 
        setScrollState("unset"); 
    }

    document.body.style.overflow = scrollState;

    return (
        <div className="home-page-container" >

            <div className="open-up-nav" ref={navWidthAnim}>
                <div className="x-nav" style={{display: navDisplay}}>
                    <img alt="" onClick={handleNavClose} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png" />
                </div>
                <div className="column-nav-inside">
                    <div className="column-nav-item-pink" style={{display: navDisplay}}>
                        <pre>
                            <Link to="/Soccer-Way">
                                Home
                            </Link>
                        </pre>
                    </div>
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <pre>
                            <Link to="/Soccer-Way/team-search">
                                Search for a Team
                            </Link>
                        </pre>
                    </div>
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <pre>
                            <Link to="/Soccer-Way/select-date-page">
                                Matches {/*(get date and search games that happenecd that date)*/}
                            </Link>
                        </pre>
                    </div>
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <pre>
                            <Link to="/Soccer-Way/find-league-page">
                                Find a League {/* http get competitions/leagues and with that compeition ID and http get competition fixtures */}
                            </Link>
                        </pre>
                    </div>
                </div>
            </div>

            <div className="background-open-nav" ref={backgroundNavAnim} onClick={handleNavClose}>

            </div>

            <nav>
                <div className="nav-container">
                    <div className="left-nav">
                        <div></div>
                    </div>
                    <div className="right-nav">
                        <div>
                            <img className="home-img" onClick={handleNavOpen} alt="" src="https://i.ibb.co/47WZHDq/device-presence-off.png" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="top-of-page-container" ref={pageWidthAnim}>

                <div className="top-of-page">
                    <h2>Soccer Way</h2>

                    <div className="p-div">
                        <p>Cupidatat irure eu fugiat consectetur non consequat magna aute fugiat anim deserunt.</p>
                    </div>
                    
                    <div className="button-div">
                        <button>Click Me</button>
                    </div>
                </div>

                <div className="mid-page">
                    <div className="mid-page-content">
                        <h2>About Soccer Way</h2>
                        <div className="log">
                            <div className="log-left"></div>
                            <div className="log-right"></div>
                        </div>
                        <div className="p-div">
                            <p>
                                Voluptate nulla minim qui sint Lorem nulla deserunt ut officia 
                                qui velit do.Consectetur id ex qui duis cupidatat in eiusmod ea 
                                excepteur.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bottom-page">
                    <h2>Recent</h2>
                    
                    <div className="box-column">
                        <div className="recent-box">There are a total of {teamName.length} soccer teams worldwide</div>
                        <div className="recent-box">{teamName[69]} will be playing in a few days</div>
                        <div className="recent-box">The one and only {teamVenue[97]} belongs to {teamName[97]}</div>
                    </div>

                </div>
            </div>

        </div>
    )
}

const mapStateToProp = state => {
    return {
        teamData: state.team.teamname, 
        teamName: state.team.teamname, 
        teamVenue: state.team.teamvenue, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTeams: () => dispatch(fetchTeams())
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(MainPage)
