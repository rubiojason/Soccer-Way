import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchDateMatches, fetchTeams/*, fetchDmHomeTeamLogo, fetchDmAwayTeamLogo*/ } from '../redux'; 
import HandleHomeImg from './HandleHomeImg';
import HandleAwayImg from './HandleAwayImg';

function DateForMatchesPage( { dmError, fetchDateMatches, dmData, fetchTeams, dmLoading }) {

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

    const [loadingPage, setLoadingPage] = useState(true); 

    const [searchDelay, setSearchDelay] = useState(false); 

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

    const handleDateSubmit = e => {
        e.preventDefault();     

        setSearchDelay(true); 

        setNoResultsState("No Results"); 
        fetchDateMatches(dateState); 

        setTimeout(() => {
            setSearchDelay(false); 
        }, 1000); 
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

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false); 
        }, 1500); 
    }, []); 

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
            loadingPage || dmLoading ? 

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
                        <div className="column-nav-item" style={{display: navDisplay}}>
                            <Link to="/Soccer-Way/team-search">
                                <pre>
                                    Search for a Team
                                </pre>
                            </Link>
                        </div>
                        <div className="column-nav-item-pink" style={{display: navDisplay, backgroundColor: 'rgb(35, 35, 35)'}}>
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
                    <h2 className="date-top-h2">Select a Date</h2>
                    
                    <form onSubmit={handleDateSubmit} onChange={handleDateChange} className="date-form-div">
                        <input className="calendar-input" type="date" />
                        <button type="submit">Save Date</button>
                    </form>
                    
                

                    <div className="date-matches-team-container">
                        {
                            dmError !== "" ? 

                            <div>{dmError}</div>

                            : 

                            dmLoading ? 

                            <div className="date-matches-team-div">
                                <div className="date-matches-2"></div>
                            </div>

                            :

                            dmData.length === 0 ? 

                            <div>{noResultsState}</div> 

                            : 

                            searchDelay ? 

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <div className="loader"></div>
                            </div>

                            : 

                            dmData.map((x, y) => 
                                <React.Fragment key={y}>
                                {
                                    dmData.indexOf(x) >= 16 ? 

                                    null 

                                    : 

                                    <div className="date-matches-team-div" key={y}>
                                        <button onClick={() => console.log(dmData)}>Click Me</button>
                                        <div className="date-matches-2">
                                            <div className="left-side">
                                                <HandleHomeImg schedule={x} />
                                                <div>{dmData[dmData.indexOf(x)].HomeTeamName}</div>
                                                <div id="dis-none-score">{dmData[dmData.indexOf(x)].HomeTeamScore}</div>
                                            </div>

                                            <div className="mid-side">vs</div>

                                            <div className="right-side">
                                                <div id="dis-none-score">{dmData[dmData.indexOf(x)].AwayTeamScore}</div>
                                                <div>{dmData[dmData.indexOf(x)].AwayTeamName}</div>
                                                <HandleAwayImg schedule={x} />
                                            </div>
                                        </div>

                                        <div className="team-score-container">
                                            <div id="score">{dmData[dmData.indexOf(x)].HomeTeamScore}</div>
                                            <div id="score">{dmData[dmData.indexOf(x)].AwayTeamScore}</div>
                                        </div>
                                    </div>  
                                }
                                </React.Fragment>
                            )
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
        teamData: state.team.teamname, 

        dmLoading: state.date.loading, 
        dmError: state.date.error, 

        dmData: state.date.data, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTeams: () => dispatch(fetchTeams()), 
        fetchDateMatches: (idx) => dispatch(fetchDateMatches(idx)), 
        // fetchDmHomeTeamLogo: (idx) => dispatch(fetchDmHomeTeamLogo(idx)), 
        // fetchDmAwayTeamLogo: (idx) => dispatch(fetchDmAwayTeamLogo(idx)), 

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(DateForMatchesPage)
