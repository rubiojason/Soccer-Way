import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { fetchLeagues, fetchLeagueKeyChosen } from '../redux'; 
import { connect } from 'react-redux'; 
import { fetchLeagueContent } from '../redux'; 

function FindLeaguePage({ fetchLeagues, fetchLeagueKeyChosen, leagueName, leagueKey, leagueCountry, 
                          fetchLeagueContent, leagueLoading }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    //const [info, setInfo] = useState([]); 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    //useEffect 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []); 

    useEffect(() => {
        fetchLeagues(); 
    }, [fetchLeagues]); 

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

    const handleLeagueClick = (name, idx, key) => {
        console.log(name); 
        console.log(idx);
        console.log(key);  
        fetchLeagueKeyChosen(key); 
        fetchLeagueContent(key); 
    }

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

                <h1 className="leagues-h1">Leagues</h1>

                {
                    leagueLoading ? 

                    <div>loading</div>

                    :

                    <div className="league-list-grid-system">
                        {leagueName.map((x, y) => 
                            <Link to="/Soccer-Way/league-content-page" className="find-league-a" key={y}>
                                <div className="find-league-box-container" 
                                onClick={() => handleLeagueClick(x, y, leagueKey[y])}>
                                    {x} 
                                </div>
                            </Link>
                        )}
                    </div>
                }
            </div>

        </div>
    )
}

const mapStateToProp = state => {
    return {
        leagueLoading: state.league.loading, 
        leagueName: state.league.leaguename, 
        leagueKey: state.league.leaguekey, 
        leagueCountry: state.league.leaguecountry, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLeagues: () => dispatch(fetchLeagues()), 
        fetchLeagueKeyChosen: (data) => dispatch(fetchLeagueKeyChosen(data)), 
        fetchLeagueContent: (idx) => dispatch(fetchLeagueContent(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(FindLeaguePage)
