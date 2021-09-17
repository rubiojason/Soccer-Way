import React, { useState, useRef, useEffect } from 'react'; 
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchTeams, getTeamIndex, getTeamSearchResults } from '../redux'; 
import HandleImg from './HandleImg';

function TeamSearchPage({ teamError, teamLoading, teamData, 
                          teamSearchResults, fetchTeams, getTeamIndex,  
                          getTeamSearchResults }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 
    const stringChecker = useRef(null); 

    //useState
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 
    const [searchState, setSearchState] = useState(""); 
    const [checkForData, setCheckForData] = useState(""); 

    const [loadingPage, setLoadingPage] = useState(true); 

    const [loadingDisplay, setLoadingDisplay] = useState(false); 

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

    document.body.style.overflow = scrollState;

    //useEffect 
    useEffect(() => {
        fetchTeams(); 
    }, [fetchTeams])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false); 
            }, 1500); 
    }, []); 

    //functions 
    const handleTeamClick = (idx, data) => {
        getTeamIndex(idx); 
    }

    const handleFormSubmit = e => {
        e.preventDefault(); 

        if (searchState.trim().length <= 3) {
            gsap.to(stringChecker.current, {opacity: 1, duration: 0.5}); 
            setCheckForData(""); 
        }

        else {
            gsap.to(stringChecker.current, {opacity: 0, duration: 1, delay: 0.75}); 

            setLoadingDisplay(true); 
            
            var tn = []; 
            var idx = []; 

            for (var i = 0; i < teamData.length; i++) {
                var team = teamData[i].Name.toLowerCase(); 
                if (team.includes(searchState.trim().toLowerCase())) {
                    if (teamData[teamData.indexOf(teamData[i])].WikipediaLogoUrl === null) {
                    }
                    else {
                        tn.push(teamData.indexOf(teamData[i]));
                        idx.push(teamData[i].TeamId); 
                    }
                }
            }
            getTeamSearchResults(tn); 

            setTimeout(() => {
                if (loadingPage || teamLoading) {
                    
                }
                setLoadingDisplay(false); 
                setCheckForData("No Results Found"); 
            }, 1500); 
        }
    }

    const handleFormChange = e => {
        e.preventDefault(); 
        setSearchState(e.target.value); 
    }

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
            loadingPage || teamLoading ? 

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="back-img-loading"></div>
                <div className="loading-back"></div>
                <div className="loader"></div>
            </div>

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

                    <form className="team-search-top-page" onSubmit={handleFormSubmit} onChange={handleFormChange}>
                        <input placeholder="Search for Team" />
                        <button>Search</button>
                        <div ref={stringChecker} className="string-checker">Enter more than 3 characters</div>
                    </form>

                    <div className="list-of-teams-div">
                        {
                            teamError !== "" ? 

                            <div>{teamError}</div>

                            : 

                            teamSearchResults === undefined ? 

                            <div></div>

                            :

                            teamSearchResults.length === 0 ? 

                            <div>{checkForData}</div>

                            : 

                            loadingDisplay ? 

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="loader"></div>
                            </div>

                            : 

                            teamSearchResults.map((data, idx) => {
                                return (
                                    <div onClick={() => handleTeamClick(data, idx)} key={idx} className="list-content-div">
                                        <Link to="/Soccer-Way/team-page" className="link-width">
                                            <div className="team-name">{teamData[data].Name}</div>
                                            <HandleImg img={teamData[data].WikipediaLogoUrl} />
                                            <div className="team-country">{teamData[data].AreaName}</div>
                                        </Link>
                                    </div>
                                )
                            })
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
        teamError: state.team.error, 
        teamData: state.team.teamdata, 
        teamLoading: state.team.loading, 
        teamSearchResults: state.team.teamsearchresults,
        teamIdResults: state.team.teamidresults,  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTeams: () => dispatch(fetchTeams()),
        getTeamIndex: (idx) => dispatch(getTeamIndex(idx)), 
        getTeamSearchResults: (idx) => dispatch(getTeamSearchResults(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TeamSearchPage)
