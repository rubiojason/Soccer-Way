import React, { useEffect, useRef, useState } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { fetchPlayersInTeam, fetchPlayerIndex } from '../redux'; 

function TeamSearchResultsPage({ teamId, teamIndex, teamName, teamLogo, teamCountry, teamVenue, 
                                 teamFounded, teamLoading, teamColors, ptLoading, ptId, 
                                 ptName, ptPhotoUrl, fetchPlayersInTeam, fetchPlayerIndex }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState("");

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

    const handlePlayerClick = (x, y) => {
        console.log("deez nuts"); 
        console.log(x);
        console.log(y);  
        fetchPlayerIndex(y); 
    }
        
    //useEffect 
    useEffect(() => {
        fetchPlayersInTeam(teamId[teamIndex]); 
    }, [fetchPlayersInTeam, teamId, teamIndex]); 

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    document.body.style.overflow = scrollState; 
    
    return (
        <div>
        {
            teamIndex === "" ? <Redirect to="/Soccer-Way/team-search" /> : 

            <div className="home-page-container">
                <div className="open-up-nav" ref={navWidthAnim}>
                    <div className="x-nav" style={{display: navDisplay}}>
                        <img alt="" onClick={handleNavClose} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png" />
                    </div>
                    <div className="column-nav-inside">
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <pre>
                            <Link to="/Soccer-Way">
                                Home
                            </Link>
                        </pre>
                    </div>
                    <div className="column-nav-item-pink" style={{display: navDisplay}}>
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

                    <div className="team-result-top-page">
                        <img className="team-result-img" alt="" src={teamLogo[teamIndex]} />
                        <h2 className="team-result-top-h2">{teamName[teamIndex]}</h2>
                        <div className="team-result-country">{teamCountry[teamIndex]}</div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Stadium
                            </div>
                            <div className="team-info">
                                {teamVenue[teamIndex]}
                            </div>
                        </div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Found
                            </div>
                            <div className="team-info">
                                {teamFounded[teamIndex]}
                            </div>
                        </div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Team Colors
                            </div>
                            <div className="team-info">
                                <div style={{backgroundColor: teamColors[teamIndex * 2]}}></div> 
                                <div style={{backgroundColor: teamColors[teamIndex * 2 + 1]}}></div>
                            </div>
                        </div>

                        <div className="team-result-player-team-result">
                            
                        </div>

                    </div>

                    <div className="team-result-bottom-page-container">

                        <h1>Players</h1>
                    {
                        ptLoading ? 
                        
                        <div>Loading</div>
                        : 

                        <div className="team-player-grid-system">
                        {
                            ptName.map((x, y) => 
                                <div key={x} className="player-name-img-div" onClick={() => handlePlayerClick(x, y)}>
                                    <Link to="/Soccer-Way/player-page" className="player-link">
                                        <div className="white-circle">
                                            <img alt="" src={ptPhotoUrl[ptName.indexOf(x)]} />
                                        </div>
                                        <div>{x}</div>
                                    </Link>
                                </div>
                            )
                        }
                        </div>
                    }
                    </div>

                </div>
            
            </div>
        }
        </div>
    )
}

const mapStateToProp = state => {
    return {
        teamId: state.team.teamid, 
        teamName: state.team.teamname, 
        teamLogo: state.team.logourl, 
        teamCountry: state.team.teamcountry, 
        teamVenue: state.team.teamvenue, 
        teamFounded: state.team.found, 
        teamColors: state.team.colors, 
        teamLoading: state.team.loading, 
        teamIndex: state.team.teamindex, 

        ptLoading: state.playerteam.loading, 
        ptId: state.playerteam.playerid, 
        ptName: state.playerteam.playername, 
        ptPhotoUrl: state.playerteam.playerphoto, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TeamSearchResultsPage)
