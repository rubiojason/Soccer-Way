import React from 'react'
import { connect } from 'react-redux'; 

function LeagueContentTeam({ leagueContentLoading,leagueContentTeamName, leagueContentTeamLogo, 
                             leagueContentTeamId }) {

    return (
        <div className="league-content-team-background-color">
            <div className="team-player-id">
                <div className="margin"></div>
                <div className="league-content-teams-grid-container">
                    
                    {
                        leagueContentLoading && leagueContentTeamName === undefined ? 
                        
                        <div>loading</div>

                        :

                        leagueContentTeamName.map((x, y) => 
                            <div key={y} className="league-content-team-grid-content" >
                                <img alt="" src={leagueContentTeamLogo[leagueContentTeamName.indexOf(x)]} />
                                <p>{x}</p>
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
        leagueContentLoading: state.leaguecontent.loading, 
        leagueContentName: state.leaguecontent.leaguename, 
        leagueContentAreaName: state.leaguecontent.leagueareaname, 
        leagueContentYear: state.leaguecontent.leagueyear, 
        leagueContentTeamId: state.leaguecontent.leagueteamid, 
        leagueContentTeamName: state.leaguecontent.leagueteamname, 
        leagueContentTeamLogo: state.leaguecontent.leagueteamlogo, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //fetchPlayersInTeam: (idx) => dispatch(fetchPlayersInTeam(idx)), 
        //fetchPlayerIndex: (idx) => dispatch(fetchPlayerIndex(idx)),
        //fetchLeagueContent: (idx) => dispatch(fetchLeagueContent(idx)),  
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(LeagueContentTeam); 
