import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchLeaguePlayerSearchIndex } from '../redux/LeagueContent/LeagueContentActions';
import gsap from 'gsap'; 

function LeagueContentPlayer({ leagueContentLoading, leagueData, 
                               fetchLeaguePlayerSearchIndex }) {
                        
    //useRef 
    const stringChecker = useRef(null); 
    
    //useState 
    const [searchState, setSearchState] = useState("");
    const [playerIdSearch, setPlayerIdSearch] = useState(""); 
    const [playerNameSearch, setPlayerNameSearch] = useState(""); 
    const [playerLogoSearch, setPlayerLogoSearch] = useState(""); 
    const [noResultDisplay, setNoResultDisplay] = useState("none"); 
    //const [backDisplay, setBackDisplay] = useState("block"); 

    const [loadingDisplay, setLoadingDisplay] = useState(true); 

    //functions 
    const handlePlayerFormSubmit = e => {
        e.preventDefault(); 

        if (searchState.trim().length <= 2) {
            gsap.to(stringChecker.current, {opacity: 1, duration: 0.5}); 
            setNoResultDisplay("none"); 
        }

        else {
            gsap.to(stringChecker.current, {opacity: 0, duration: 1, delay: 0.75}); 

            setLoadingDisplay(true); 

            setNoResultDisplay("flex"); 
            console.log("searching for " + searchState); 

            var playerid = []; 
            var playerNames = []; 
            var playerLogos = []; 

            for (var i = 0; i < leagueData.Teams.length; i++) {
                for (var j = 0; j < leagueData.Teams[i].Players.length; j++) {
                    if ((leagueData.Teams[i].Players[j].CommonName.toLowerCase()).includes(searchState.toLowerCase().trim())) {
                        playerid.push(leagueData.Teams[i].Players[j].PlayerId); 
                        playerNames.push(leagueData.Teams[i].Players[j].CommonName); 
                        playerLogos.push(leagueData.Teams[i].Players[j].PhotoUrl); 
                    }
                }
            }

            setPlayerIdSearch(playerid); 
            setPlayerNameSearch(playerNames); 
            setPlayerLogoSearch(playerLogos); 

            setTimeout(() => {
                setLoadingDisplay(false); 
            }, 1000); 
        }
    }

    const handlePlayerFormChange = e => {
        e.preventDefault(); 
        setSearchState(e.target.value); 
    }

    const handlePlayerClick = e => {  
        fetchLeaguePlayerSearchIndex(e); 
    }

    return (
        <div className="team-player-id">

            <form className="league-content-search-player" onSubmit={handlePlayerFormSubmit} onChange={handlePlayerFormChange}>
                <input placeholder="Search for Player" />
                <button>Search</button>
                <div ref={stringChecker} className="string-checker">Enter more than 2 characters</div>
            </form>

            <div className="league-content-player-search-container">
                {
                    playerNameSearch === "" || playerNameSearch.length === 0 ? 
                    
                    <div style={{display: noResultDisplay}}>No Results</div> 

                    :

                    loadingDisplay ? 

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="loader"></div>
                    </div>

                    : 

                    playerNameSearch.map((x, y) => 
                        <div key={y} onClick={() => handlePlayerClick(playerIdSearch[y])} className="league-content-player-search">
                            <Link to="/Soccer-Way/player-page-2" className="league-content-link">
                                <img alt="" src={playerLogoSearch[y]} />
                                <div>{x}</div>
                            </Link>  
                        </div>
                    )
                }
            </div>

            {
                playerNameSearch === "" || playerNameSearch.length === 0 ? 

                <div className="extra-block" style={{display: "block"}}></div> 
                :
                <div></div>
            }
    
            <div className="margin"></div>
        </div>
    )
}

const mapStateToProp = state => {
    return {
        leagueContentLoading: state.leaguecontent.loading,
        leagueData: state.leaguecontent.data, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        //fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)),
        //fetchLeagueContent: (idx) => dispatch(fetchLeagueContent(idx)),  
        fetchLeaguePlayerSearchIndex: (idx) => dispatch(fetchLeaguePlayerSearchIndex(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(LeagueContentPlayer); 
