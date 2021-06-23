import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchPlayer, fetchPlayerSchedule } from '../redux';
import gsap from 'gsap';  
import { Redirect } from "react-router-dom";

function PlayerPage2({ leagueContentPlayerIndex, fetchPlayer, leagueKeyChosen, playerId, 
                       playerName, playerLogo, playerNumber, playerFoot, playerNationality, 
                       playerWeight, playerHeight, fetchPlayerSchedule, psHomeTeam, psHomeCode, 
                       psAwayTeam, psAwayCode, playerLoading }) {

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
        gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%", display: "none"}, {width: "55vw", right: "0%", backgroundColor: "rgb(58, 43, 88)", display: "flex", flexDirection: "column"});
        gsap.fromTo(backgroundNavAnim.current, {width: "100vw", height: "100vh"}, {display: "flex", backgroundColor: "rgba(0, 0, 0, 0.4)", width: "100vw", height: "100vh", position: "absolute", opacity: 1, zIndex: 999}); 
        setScrollState("hidden"); 
    }

    const handleNavClose = () => {
        setNavDisplay("none")
        gsap.to(pageWidthAnim.current, {marginRight: "0px"}); 
        gsap.to(navWidthAnim.current, {width: "0px", display: "none"}); 
        gsap.to(backgroundNavAnim.current, {opacity: 0, display: "none"}); 
        setScrollState("unset"); 
    }

    //useEffect 
    useEffect(() => {
        fetchPlayer(leagueContentPlayerIndex); 
        fetchPlayerSchedule(leagueContentPlayerIndex); 
    }, [fetchPlayer, leagueContentPlayerIndex, fetchPlayerSchedule]); 

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []); 

    document.body.style.overflow = scrollState; 

    return (
        <div>
        {
            leagueKeyChosen === "" ? <Redirect to="/Soccer-Way/find-league-page" /> : 

            playerLoading ? 

            <div></div>

            :

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
                    <div className="column-nav-item-pink" style={{display: navDisplay}}>
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

                    <div className="player-top-of-page">
                        <div className="player-img-container">
                            <img alt="" src={playerLogo} />
                        </div>
                        <div className="player-name">{playerName}</div>

                        {/*<Link to="/Soccer-Way/team-page" className="player-team-name">
                                <img alt="" src={teamLogo[teamIndex]} />
                                <div>{teamName[teamIndex]}</div>
                        </Link>*/}

                    </div>

                    <div className="player-info-box">
                        <div>
                            <div className="h-font-weight">Jersey</div>
                            <div>{playerNumber}</div>
                        </div>
                        <div>
                            <div className="h-font-weight">Foot</div>
                            <div>{playerFoot}</div>
                        </div>
                        <div>
                            <div className="h-font-weight">Nationality</div>
                            <div>{playerNationality}</div>
                        </div>
                    </div>

                    <div className="player-info-box">
                        <div>
                            <div className="h-font-weight">Weight</div>
                            <div className="height-width-container">
                                <img alt="" src="https://static.thenounproject.com/png/1712070-200.png" />
                                <div>{playerWeight} kg</div>
                            </div>
                        </div>
                        <div>
                            <div className="h-font-weight">Height</div>
                            <div className="height-width-container">
                                <img alt="" src="https://cdn2.iconfinder.com/data/icons/health-check-up/64/height-tall-measure-body-man-512.png" />
                                <div>{playerHeight} cm</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="upcoming-games-h2">Upcoming Games</h2>

                    {
                        psHomeTeam.length === 0 ? 

                        <div className="no-upcoming-games">No Upcoming Games</div>
                        
                        : 
                        
                        psHomeTeam.map((x, y) => 
                            <div className="player-info-box">
                                <div>
                                    <h2>{x}</h2>
                                    <div className="team-code">{psHomeCode[psHomeTeam.indexOf(x)]}</div>
                                </div>
                                <div className="vs">vs</div>
                                <div>
                                    <h2>{psAwayTeam[psHomeTeam.indexOf(x)]}</h2>
                                    <div className="team-code">{psAwayCode[psHomeTeam.indexOf(x)]}</div>
                                </div>
                                
                            </div>
                        )
                    }   
                    

                    <div className="margin"></div>

                </div>
            
            </div>

        }
        </div>
    )
}

const mapStateToProp = state => {
    return {
        psHomeTeam: state.playerschedule.hometeam, 
        psHomeCode: state.playerschedule.homecode, 
        psAwayTeam: state.playerschedule.awayteam, 
        psAwayCode: state.playerschedule.awaycode, 

        leagueContentPlayerIndex: state.leaguecontent.leagueplayersearchindex, 
        leagueKeyChosen: state.league.leaguekeychosen, 

        playerLoading: state.player.playerloading, 

        playerId: state.player.playerid, 
        playerName: state.player.playername, 
        playerLogo: state.player.playerlogo, 
        playerNumber: state.player.playernumber, 
        playerFoot: state.player.playerfoot, 
        playerNationality: state.player.playernationality, 
        playerWeight: state.player.playerweight, 
        playerHeight: state.player.playerheight, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlayer: (idx) => dispatch(fetchPlayer(idx)), 
        fetchPlayerSchedule: (idx) => dispatch(fetchPlayerSchedule(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(PlayerPage2); 
