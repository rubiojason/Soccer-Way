import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'; 
import { Link } from 'react-router-dom';
import { fetchLeagues, fetchLeagueKeyChosen } from '../redux'; 
import { connect } from 'react-redux'; 
import { fetchLeagueContent } from '../redux'; 

function FindLeaguePage({ fetchLeagues, fetchLeagueKeyChosen, leagueData, 
                          fetchLeagueContent, leagueLoading, leagueError }) {

    //useRef 
    const pageWidthAnim = useRef(null); 
    const navWidthAnim = useRef(null); 
    const backgroundNavAnim = useRef(null); 

    //useState
    //const [info, setInfo] = useState([]); 
    const [navDisplay, setNavDisplay] = useState("none"); 
    const [scrollState, setScrollState] = useState(""); 

    const [loadingPage, setLoadingPage] = useState(true); 

    //useEffect 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []); 

    useEffect(() => {
        fetchLeagues(); 
    }, [fetchLeagues]); 

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false); 
        }, 1500); 
    }, []); 

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

    const handleLeagueClick = (name, idx, key) => {
        fetchLeagueKeyChosen(key); 
        fetchLeagueContent(key); 
    }

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

            <div className="home-page-container" >

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
                                    Find a League {/* http get competitions and with that compeition KEY and http get competition fixtures */}
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

                    <h1 className="leagues-h1">Leagues</h1>

                    {
                        leagueError !== "" ? 

                        <div>{leagueError}</div>

                        : 

                        leagueLoading ? 

                        <div>loading</div>

                        :

                        <div className="league-list-grid-system">
                            {leagueData.map((x, y) => 
                                <Link to="/Soccer-Way/league-content-page" className="find-league-a" key={x.CompetitionId}>
                                    <div className="find-league-box-container" 
                                    onClick={() => handleLeagueClick(x, y, leagueData[y].Key)}>
                                        {x.Name} 
                                    </div>
                                </Link>
                            )}
                        </div>
                    }
                </div>

            </div>
        }
        </div>
    )
}

const mapStateToProp = state => {
    return {
        leagueLoading: state.league.loading, 
        leagueError: state.league.error, 
        leagueData: state.league.data, 
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
