import React, { useEffect, useRef, useState } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { fetchPlayersInTeam, fetchPlayerIndex } from '../redux'; 
import HandleImg from './HandleImg';

function TeamSearchResultsPage({ teamData, teamLoading, teamIndex, ptData,  
                                 ptLoading, fetchPlayersInTeam, fetchPlayerIndex }) {

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
        gsap.to(navWidthAnim.current, {width: "0px"}); 
        gsap.to(backgroundNavAnim.current, {opacity: 0, display: "none"}); 
        setScrollState("unset"); 
    }

    const handlePlayerClick = (x, y) => { 
        fetchPlayerIndex(y); 
    }
        
    //useEffect 
    useEffect(() => {
        if (teamIndex !== "") {
            fetchPlayersInTeam(teamData[teamIndex].TeamId); 
        }
    }, [fetchPlayersInTeam, teamData, teamIndex]); 

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        if (teamIndex !== "") {
            setTimeout(() => {
                setLoadingPage(false); 
            }, 1000); 
        }
    }, [teamIndex]);  

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

            <div className="back-img"></div>

        {
            teamIndex === "" ? <Redirect to="/Soccer-Way/team-search" /> : 

            loadingPage || teamLoading || ptLoading ? 

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="back-img-loading"></div>
                <div className="loading-back"></div>
                <div className="loader"></div>
            </div>

            :

            <div className="home-page-container">
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
                    <div className="column-nav-item-pink" style={{display: navDisplay, backgroundColor: 'rgb(35, 35, 35)'}}>
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
                    <div className="column-nav-item" style={{display: navDisplay}}>
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

                    <div className="team-result-top-page">
                        <HandleImg img={teamData[teamIndex].WikipediaLogoUrl} class="team-result-img" />
                        <h2 className="team-result-top-h2">{teamData[teamIndex].Name}</h2>
                        <div className="team-result-country">{teamData[teamIndex].AreaName}</div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Stadium
                            </div>
                            <div className="team-info">
                                {teamData[teamIndex].VenueName}
                            </div>
                        </div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Found
                            </div>
                            <div className="team-info">
                                {teamData[teamIndex].Founded}
                            </div>
                        </div>

                        <div className="team-info-div">
                            <div className="border-top-team-info">
                                Team Colors
                            </div>
                            <div className="team-info">
                                <div style={{backgroundColor: teamData[teamIndex].ClubColor1}}></div>
                                <div style={{backgroundColor: teamData[teamIndex].ClubColor2}}></div>
                            </div>
                        </div>

                        <div className="team-result-player-team-result">
                            
                        </div>

                    </div>

                    <div className="team-result-bottom-page-container">

                        <h1>Players</h1>
                    {
                        ptLoading ? 
                        
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <div className="back-img-loading"></div>
                            <div className="loading-back"></div>
                            <div className="loader"></div>
                        </div>
                        : 

                        <div className="team-player-grid-system">
                        {
                            ptData.map((x, y) => 
                                <div className="player-name-img-div" key={y} onClick={() => handlePlayerClick(x, y)}>
                                    <Link to="/Soccer-Way/player-page" className="player-link">
                                        <div className="white-circle">
                                            <img alt="" src={x.PhotoUrl} />
                                        </div>
                                        <div>{x.CommonName}</div>
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
        teamData: state.team.teamdata, 
        teamLoading: state.team.loading, 
        teamIndex: state.team.teamindex, 

        ptLoading: state.playerteam.loading, 
        ptData: state.playerteam.data, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TeamSearchResultsPage)
