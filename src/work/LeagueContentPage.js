import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'; 
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom"; 
import { fetchLeagueContent } from '../redux'; 
import LeagueContentTeam from './LeagueContentTeam';
import LeagueContentPlayer from './LeagueContentPlayer';

function LeagueContentPage({ leagueKeyChosen, fetchLeagueContent, leagueContentName, 
                             leagueContentAreaName, leagueContentYear, leagueContentTeamId, 
                             leagueContentTeamName, leagueContentTeamLogo, leagueLoading }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    //const [info, setInfo] = useState([]); 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    const [teamOrPlayer, setTeamOrPlayer] = useState("team"); 
    const [teamBack, setTeamBack] = useState("rgb(58, 43, 88)"); 
    const [playerBack, setPlayerBack] = useState("rgb(49, 39, 76)"); 

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

    const TeamClick = () => {
        setTeamOrPlayer("team"); 
        setTeamBack("rgb(58, 43, 88)"); 
        setPlayerBack("rgb(49, 39, 76)"); 
    }

    const PlayerClick = () => {
        setTeamOrPlayer("player"); 
        setTeamBack("rgb(49, 39, 76)"); 
        setPlayerBack("rgb(58, 43, 88)");
    }

    //useEffect 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []); 

    document.body.style.overflow = scrollState;

    return (
        <div>
            {
                leagueKeyChosen === "" ? 

                <Redirect to="/Soccer-Way/find-league-page" />

                : 

                leagueLoading ? 

                <div></div>

                :

                <div className="home-page-container" >

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
                                    Find a League {/* http get competitions and with that compeition KEY and http get competition fixtures */}
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
                    <h2 className="league-content-title">{leagueContentName}</h2>
                    <div className="league-content-league-name">{leagueContentAreaName}</div>
                    <h3 id="league-h3">{leagueContentYear}</h3>

                    <div className="league-content-team-players-options">
                        <div className="league-content-team-side" onClick={TeamClick} style={{backgroundColor: teamBack}}>Teams</div>
                        <div className="league-content-player-side" onClick={PlayerClick} style={{backgroundColor: playerBack}}>Players</div>
                    </div>

                    <div className="league-content-teams-grid-container-1">
                        {
                            teamOrPlayer === "team" ? 

                            <LeagueContentTeam />

                            : 

                            <LeagueContentPlayer />
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

        leagueKeyChosen: state.league.leaguekeychosen, 

        leagueLoading: state.leaguecontent.loading, 

        leagueContentName: state.leaguecontent.leaguename, 
        leagueContentAreaName: state.leaguecontent.leagueareaname, 
        leagueContentYear: state.leaguecontent.leagueyear, 
        leagueContentTeamId: state.leaguecontent.leagueteamid, 
        leagueContentTeamName: state.leaguecontent.leagueteamname, 
        leagueContentTeamLogo: state.leaguecontent.leagueteamlogo, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        //fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)),
        fetchLeagueContent: (idx) => dispatch(fetchLeagueContent(idx)),  
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(LeagueContentPage); 
