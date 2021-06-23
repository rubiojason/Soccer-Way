import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchDateMatches, fetchTeams, fetchDmHomeTeamLogo, fetchDmAwayTeamLogo } from '../redux'; 

function DateForMatchesPage( { fetchDateMatches, dmHomeTeam, dmAwayTeam, fetchTeams, teamName, 
                               fetchDmHomeTeamLogo, fetchDmAwayTeamLogo, dmHomeTeamScore, 
                               dmAwayTeamScore, dmLoading }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    //const [info, setInfo] = useState([]); 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    const [dateState, setDateState] = useState(""); 
    const [noResultsState, setNoResultsState] = useState("");  

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

    const handleDateSubmit = e => {
        e.preventDefault();     
        console.log(dateState); 
        setNoResultsState("No Results"); 
        console.log(dmHomeTeam); 
        fetchDateMatches(dateState); 
    }

    const handleDateChange = e => {
        e.preventDefault(); 
        setDateState(e.target.value); 
    }

    
    //useEffect 
    useEffect(() => {
        fetchTeams(); 
    }, [fetchTeams]); 

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []); 

    document.body.style.overflow = scrollState;

    return (
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
                    <div className="column-nav-item-pink" style={{display: navDisplay}}>
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
                <h2 className="date-top-h2">Select a Date</h2>
                
                <form onSubmit={handleDateSubmit} onChange={handleDateChange} className="date-form-div">
                    <input className="calendar-input" type="date" />
                    <button type="submit">Save Date</button>
                </form>
                
            

                <div className="date-matches-team-container">
                    {
                        dmLoading ? 

                        <div className="date-matches-team-div">
                            <div className="date-matches-2"></div>
                        </div>

                        :

                        dmHomeTeam.length === 0 ? 

                        <div>{noResultsState}</div> 

                        : 

                        dmHomeTeam.map((x, y) => 
                            <div className="date-matches-team-div">
                                <div className="date-matches-2">
                                    <div className="left-side">
                                        <div>{x}</div>
                                    </div>

                                    <div className="mid-side">vs</div>

                                    <div className="right-side">
                                        <div>{dmAwayTeam[dmHomeTeam.indexOf(x)]}</div>
                                    </div>
                                </div>

                                <div className="team-score-container">
                                    <div id="score">{dmHomeTeamScore[dmHomeTeam.indexOf(x)]}</div>
                                    <div id="score">{dmAwayTeamScore[dmHomeTeam.indexOf(x)]}</div>
                                </div>
                            </div>    
                        )
                    }
                </div>

            </div>

        </div>
    )
}

const mapStateToProp = state => {
    return {
        teamData: state.team.teamname, 

        dmLoading: state.date.loading, 

        dmHomeTeam: state.date.hometeam, 
        dmAwayTeam: state.date.awayteam, 
        teamName: state.team.teamname,  
        dmHomeTeamScore: state.date.hometeamscore, 
        dmAwayTeamScore: state.date.awayteamscore, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTeams: () => dispatch(fetchTeams()), 
        fetchDateMatches: (idx) => dispatch(fetchDateMatches(idx)), 
        fetchDmHomeTeamLogo: (idx) => dispatch(fetchDmHomeTeamLogo(idx)), 
        fetchDmAwayTeamLogo: (idx) => dispatch(fetchDmAwayTeamLogo(idx)), 

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(DateForMatchesPage)
