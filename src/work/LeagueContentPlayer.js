import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { fetchLeaguePLayerSearchIndex } from '../redux/LeagueContent/LeagueContentActions';

function LeagueContentPlayer({ leagueContentLoading, leagueContentPlayerId,
                               leagueContentPlayerName, leagueContentPlayerLogo, 
                               fetchLeaguePLayerSearchIndex }) {
    
    //useState 
    const [searchState, setSearchState] = useState("");
    const [playerIdSearch, setPlayerIdSearch] = useState(""); 
    const [playerNameSearch, setPlayerNameSearch] = useState(""); 
    const [playerLogoSearch, setPlayerLogoSearch] = useState(""); 
    const [noResultDisplay, setNoResultDisplay] = useState("none"); 
    const [backDisplay, setBackDisplay] = useState("block"); 

    //functions 
    const handlePlayerFormSubmit = e => {
        e.preventDefault(); 
        setNoResultDisplay("flex"); 
        console.log("searching for " + searchState); 

        var playerid = []; 
        var playerNames = []; 
        var playerLogos = []; 

        for (var i = 0; i < leagueContentPlayerName.length; i++) {
            if ((leagueContentPlayerName[i].toLowerCase()).includes(searchState.toLowerCase())) {
                playerid.push(leagueContentPlayerId[i]); 
                playerNames.push(leagueContentPlayerName[i]); 
                playerLogos.push(leagueContentPlayerLogo[i]); 
                
                setPlayerIdSearch(playerid); 
                setPlayerNameSearch(playerNames); 
                setPlayerLogoSearch(playerLogos); ;
            }
        }
        setPlayerIdSearch(playerid); 
        setPlayerNameSearch(playerNames); 
        setPlayerLogoSearch(playerLogos); 
    }

    const handlePlayerFormChange = e => {
        e.preventDefault(); 
        setSearchState(e.target.value); 
    }

    const handlePlayerClick = e => {  
        fetchLeaguePLayerSearchIndex(leagueContentPlayerId[leagueContentPlayerId.indexOf(e)]);  
    }

    return (
        <div className="team-player-id">

            <form className="league-content-search-player" onSubmit={handlePlayerFormSubmit} onChange={handlePlayerFormChange}>
                <input placeholder="Search for Player" />
                <button>Search</button>
            </form>

            <div className="league-content-player-search-container">
                {
                    playerNameSearch === "" || playerNameSearch.length === 0 ? 
                    
                    <div style={{display: noResultDisplay}}>No Results</div> : 

                    playerNameSearch.map((x, y) => 
                        <div key={y} onClick={() => handlePlayerClick(playerIdSearch[y])} className="league-content-player-search">
                            <Link to="/Soccer-Way/player-page-2" className="league-content-link">
                                <img alt="" src={playerLogoSearch[playerNameSearch.indexOf(x)]} />
                                <div>{x}</div>
                            </Link>  
                        </div>
                    )
                }
            </div>

            <div className="league-content-teams-grid-container" style={{display: 'none'}}>
                {
                    leagueContentLoading || leagueContentPlayerName === undefined ? 

                    <div>loading</div>

                    : 

                    leagueContentPlayerName.length === 0 ? 

                    <div>No Results</div>

                    :

                    leagueContentPlayerName.map((x, y) => 
                        <div key={y} className="league-content-team-grid-content">
                            <img alt="" src={leagueContentPlayerLogo[leagueContentPlayerName.indexOf(x)]} />
                            <p>{x}</p>
                        </div>
                    )
                }
            </div>

            {
                playerNameSearch === "" || playerNameSearch.length === 0 ? 

                <div className="extra-block" style={{display: backDisplay}}></div> 
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
        leagueContentName: state.leaguecontent.leaguename, 
        leagueContentAreaName: state.leaguecontent.leagueareaname, 
        leagueContentYear: state.leaguecontent.leagueyear, 

        leagueContentTeamId: state.leaguecontent.leagueteamid, 
        leagueContentTeamName: state.leaguecontent.leagueteamname, 
        leagueContentTeamLogo: state.leaguecontent.leagueteamlogo, 

        leagueContentPlayerId: state.leaguecontent.leagueplayerid, 
        leagueContentPlayerName: state.leaguecontent.leagueplayername, 
        leagueContentPlayerLogo: state.leaguecontent.leagueplayerlogo, 
        leagueContentPlayerNationality: state.leaguecontent.leagueplayernationality, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        //fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)),
        //fetchLeagueContent: (idx) => dispatch(fetchLeagueContent(idx)),  
        fetchLeaguePLayerSearchIndex: (idx) => dispatch(fetchLeaguePLayerSearchIndex(idx)), 
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(LeagueContentPlayer); 
