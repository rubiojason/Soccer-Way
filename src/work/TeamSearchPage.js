import React, { useState, useRef, useEffect } from 'react'; 
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchTeams, getTeamIndex, getTeamSearchResults } from '../redux'; 

function TeamSearchPage({ teamId, teamName, teamLogo, teamCountry, teamVenue, 
                          teamFounded, teamColors, teamLoading, teamIndex, 
                          teamSearchResults, fetchTeams, getTeamIndex,  
                          getTeamSearchResults }) {

    //const [name, setName] = Array.from(teamName); 

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 
    const [searchState, setSearchState] = useState(""); 
    const [checkForData, setCheckForData] = useState(""); 

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

    //useEffect 
    useEffect(() => {
        fetchTeams(); 
    }, [fetchTeams])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    //functions 
    const handleTeamClick = (idx, data) => {
        getTeamIndex(idx); 
    }

    const handleFormSubmit = e => {
        e.preventDefault(); 
        setCheckForData("No Results Found"); 
        console.log("searching " + searchState);
        
        var tn = []; 
        var idx = []; 

        for (var i = 0; i < teamName.length; i++) {
            var team = teamName[i].toLowerCase(); 
            if (team.includes(searchState.trim().toLowerCase())) {
                if (teamLogo[teamName.indexOf(teamName[i])] === null) {
                }
                else {
                    tn.push(teamName.indexOf(teamName[i]));
                    idx.push(teamId[i]); 
                }
            }
        }
        getTeamSearchResults(tn); 
    }

    const handleFormChange = e => {
        e.preventDefault(); 
        setSearchState(e.target.value); 
    }


    return (
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

                <form className="team-search-top-page" onSubmit={handleFormSubmit} onChange={handleFormChange}>
                    <input placeholder="Search for Team" />
                    <button>Search</button>
                </form>

                <div className="list-of-teams-div">
                    {
                        teamSearchResults === undefined ? 
                        <div></div>
                        :
                        teamSearchResults.length === 0 ? 
                        <div>{checkForData}</div>
                        :
                        teamSearchResults.map((data, idx) => {
                            return (
                                <div className="list-content-div" key={idx} onClick={() => handleTeamClick(data, idx)}>
                                    <Link to="/Soccer-Way/team-page" className="link-width">
                                        <div className="team-name">{teamName[data]}</div>
                                        <img alt="" src={teamLogo[data]} />
                                        <div className="team-country">{teamCountry[data]}</div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

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
