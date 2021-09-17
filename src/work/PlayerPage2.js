import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchPlayer, fetchPlayerSchedule, fetchTeams } from '../redux';
import gsap from 'gsap';  
import { Redirect } from "react-router-dom";
import HandleHomeImg from './HandleHomeImg';
import HandleAwayImg from './HandleAwayImg';

function PlayerPage2({ leagueContentPlayerIndex, fetchPlayer, leagueKeyChosen, 
                       playerData, fetchPlayerSchedule, psData, playerLoading, 
                       fetchTeams }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState("");

    const [loadingPage, setLoadingPage] = useState(true); 

    //functions 
    const handleNavOpen = () => {
        setNavDisplay("flex"); 

        if (size.width < 768) {
            gsap.to(pageWidthAnim.current, {marginRight: "100vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "55vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1024) {
            gsap.to(pageWidthAnim.current, {marginRight: "80vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "40vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1440) {
            gsap.to(pageWidthAnim.current, {marginRight: "60vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "30vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width < 1850) {
            gsap.to(pageWidthAnim.current, {marginRight: "40vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "20vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }

        else if (size.width >= 1850) {
            gsap.to(pageWidthAnim.current, {marginRight: "30vw"}); 
            gsap.fromTo(navWidthAnim.current, {width: "0px", right: "0%"}, {width: "15vw", right: "0%", backgroundColor: "rgb(15, 15, 15)", display: "flex", flexDirection: "column"});
        }
        
        gsap.fromTo(backgroundNavAnim.current, {width: "100vw", height: "100vh"}, {display: "flex", backgroundColor: "rgba(0, 0, 0, 0.75)", width: "100vw", height: "100vh", position: "fixed", opacity: 1, zIndex: 999}); 
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

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false); 
        }, 1500); 
    }, []); 

    useEffect(() => {
        fetchTeams(); 
    }, [fetchTeams]); 

    document.body.style.overflow = scrollState; 
    
    //window size 
    const size = useWindowSize();

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });
        
        useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);
            
            // Call handler right away so state gets updated with initial window size
            handleResize();
            
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        
        return windowSize;
    }

    return (
        <div>

        {

            loadingPage ? 

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="back-img-loading"></div>
                <div className="loading-back"></div>
                <div className="loader"></div>
            </div>

            :

            leagueKeyChosen === "" ? <Redirect to="/Soccer-Way/find-league-page" /> 
            
            : 

            playerLoading ? 

            <div></div>

            :

            <div className="home-page-container">

                <div className="back-img"></div>

                <div className="open-up-nav" ref={navWidthAnim}>
                    <div className="x-nav" style={{display: navDisplay}}>
                        <img alt="" onClick={handleNavClose} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Cross_icon_%28white%29.svg/1024px-Cross_icon_%28white%29.svg.png" />
                    </div>
                    <div className="column-nav-inside">
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <Link to="/Soccer-Way">
                            <pre>
                                Home
                            </pre>
                        </Link>
                    </div>
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <Link to="/Soccer-Way/team-search">
                            <pre>
                                Search for a Team
                            </pre>
                        </Link>
                    </div>
                    <div className="column-nav-item" style={{display: navDisplay}}>
                        <Link to="/Soccer-Way/select-date-page">
                            <pre>
                                Matches {/*(get date and search games that happenecd that date)*/}
                            </pre>
                        </Link>
                    </div>
                    <div className="column-nav-item-pink" style={{display: navDisplay, backgroundColor: 'rgb(35, 35, 35)'}}>
                        <Link to="/Soccer-Way/find-league-page">
                            <pre>
                                Find a League {/* http get competitions/leagues and with that compeition ID and http get competition fixtures */}
                            </pre>
                        </Link>
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
                            {/* <img alt="" src={playerLogo} /> */}
                            <img alt="" src={playerData.PhotoUrl} />
                        </div>
                        {/* <div className="player-name">{playerName}</div> */}
                        <div className="player-name">{playerData.CommonName}</div>

                        {/*<Link to="/Soccer-Way/team-page" className="player-team-name">
                                <img alt="" src={teamLogo[teamIndex]} />
                                <div>{teamName[teamIndex]}</div>
                        </Link>*/}

                    </div>

                    <div className="player-info-box pink-back">
                        <div>
                            <div className="h-font-weight">Jersey</div>
                            {/* <div className="h-lower-font">{playerNumber}</div> */}
                            <div className="h-lower-font">{playerData.Jersey}</div>
                        </div>
                        <div>
                            <div className="h-font-weight">Foot</div>
                            {/* <div className="h-lower-font">{playerFoot}</div> */}
                            <div className="h-lower-font">{playerData.Foot}</div>
                        </div>
                        <div>
                            <div className="h-font-weight">Nationality</div>
                            {/* <div className="h-lower-font">{playerNationality}</div> */}
                            <div className="h-lower-font">{playerData.Nationality}</div>
                        </div>
                    </div>

                    <div className="player-info-box pink-back">
                        <div>
                            <div className="h-font-weight">Weight</div>
                            <div className="height-width-container">
                                <img alt="" src={process.env.PUBLIC_URL + '/weight.png'} />
                                <div>{playerData.Weight} kg</div>
                            </div>
                        </div>
                        <div>
                            <div className="h-font-weight">Height</div>
                            <div className="height-width-container">
                                <img alt="" src={process.env.PUBLIC_URL + '/height.png'} />
                                <div>{playerData.Height} cm</div>
                            </div>
                        </div>
                    </div>

                    <h2 className="upcoming-games-h2">Upcoming Games</h2>

                    {
                        psData.length === 0 ? 

                        <div className="no-upcoming-games">No Upcoming Games</div>
                        
                        : 
                        
                        psData.map((x, y) => 
                            y <= 9 ? 

                            <div className="player-info-box" key={y}>
                                <div className="player-info-small-box">
                                    <h2 style={{order: size.width > 1300 ? 2 : null}}>{psData[psData.indexOf(x)].HomeTeamName}</h2>
                                    <HandleHomeImg schedule={x} style={{order: size.width > 1300 ? 1 : null}} />
                                </div>
                                <div className="vs">vs</div>
                                <div className="player-info-small-box">
                                    <h2>{psData[psData.indexOf(x)].AwayTeamName}</h2>
                                    <HandleAwayImg schedule={x} />
                                </div>
                            </div>

                            : 

                            null 
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
        psData: state.playerschedule.data, 

        // psHomeTeam: state.playerschedule.hometeam, 
        // psHomeCode: state.playerschedule.homecode, 
        // psAwayTeam: state.playerschedule.awayteam, 
        // psAwayCode: state.playerschedule.awaycode, 

        leagueContentPlayerIndex: state.leaguecontent.leagueplayersearchindex, 

        leagueKeyChosen: state.league.leaguekeychosen, 

        playerLoading: state.player.playerloading, 
        playerData: state.player.data, 

        // playerId: state.player.playerid, 
        // playerName: state.player.playername, 
        // playerLogo: state.player.playerlogo, 
        // playerNumber: state.player.playernumber, 
        // playerFoot: state.player.playerfoot, 
        // playerNationality: state.player.playernationality, 
        // playerWeight: state.player.playerweight, 
        // playerHeight: state.player.playerheight, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlayer: (idx) => dispatch(fetchPlayer(idx)), 
        fetchPlayerSchedule: (idx) => dispatch(fetchPlayerSchedule(idx)), 
        fetchTeams: () => dispatch(fetchTeams()),
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(PlayerPage2); 
