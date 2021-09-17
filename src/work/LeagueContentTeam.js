import React from 'react'
import { connect } from 'react-redux'; 
import HandleImg from './HandleImg';

function LeagueContentTeam({ leagueContentLoading, leagueData }) {

    return (
        <div className="league-content-team-background-color">
            <div className="team-player-id">
                <div className="margin"></div>
                <div className="league-content-teams-grid-container">
                    
                    {
                        leagueContentLoading && leagueData.Teams === undefined ? 
                        
                        null

                        :

                        leagueData.Teams.map((x, y) => 
                            <div key={y} className="league-content-team-grid-content" >
                                <HandleImg img={x.WikipediaLogoUrl} />
                                <p>{x.Name}</p>
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
        leagueData: state.leaguecontent.data, 
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
