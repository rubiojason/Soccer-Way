import { LEAGUE_CONTENT_REQUEST, LEAGUE_CONTENT_FAILURE, LEAGUE_NAME, 
         LEAGUE_AREA_NAME, LEAGUE_YEAR, LEAGUE_TEAM_ID, LEAGUE_TEAM_NAME, 
         LEAGUE_TEAM_LOGO, LEAGUE_PLAYER_ID, LEAGUE_PLAYER_NAME, LEAGUE_PLAYER_LOGO, 
         LEAGUE_PLAYER_NATIONALITY, LEAGUE_PLAYER_SEARCH_INDEX } from "./LeagueContentTypes";
import axios from 'axios'; 

export const fetchLeagueContentRequest = () => {
    return {
        type: LEAGUE_CONTENT_REQUEST,  
    }
}

export const fetchLeagueContentFailure = error => {
    return {
        type: LEAGUE_CONTENT_FAILURE, 
        payload: error, 
    }
}

export const fetchLeagueName = data => {
    return {
        type: LEAGUE_NAME, 
        payload: data, 
    }
}

export const fetchLeagueAreaName = data => {
    return {
        type: LEAGUE_AREA_NAME, 
        payload: data, 
    }
}

export const fetchLeagueYear = data => {
    return {
        type: LEAGUE_YEAR, 
        payload: data, 
    }
}

export const fetchLLeagueTeamId = data => {
    return {
        type: LEAGUE_TEAM_ID, 
        payload: data, 
    }
}

export const fetchLeagueTeamName = data => {
    return {
        type: LEAGUE_TEAM_NAME, 
        payload: data, 
    }
}

export const fetchLeagueTeamLogo = data => {
    return {
        type: LEAGUE_TEAM_LOGO, 
        payload: data, 
    }
}

export const fetchLeaguePlayerId = data => {
    return {
        type: LEAGUE_PLAYER_ID, 
        payload: data 
    }
}

export const fetchLeaguePlayerName = data => {
    return {
        type: LEAGUE_PLAYER_NAME, 
        payload: data 
    }
}

export const fetchLeaguePlayerLogo = data => {
    return {
        type: LEAGUE_PLAYER_LOGO, 
        payload: data 
    }
}

export const fetchLeaguePlayerNationality = data => {
    return {
        type: LEAGUE_PLAYER_NATIONALITY, 
        payload: data 
    }
}

export const fetchLeaguePLayerSearchIndex = data => {
    return {
        type: LEAGUE_PLAYER_SEARCH_INDEX, 
        payload: data 
    }
}

export const fetchLeagueContent = id => {
    return (dispatch) => {
        dispatch(fetchLeagueContentRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/" + id + "?key=5f12486c770d409fb4a6901307ad99b4") 
        .then(res => {
            const users = res.data; 

            var leagueName = []; 
            var leagueAreaName = []; 
            var leagueYear = []; 

            var leagueTeamId = []; 
            var leagueTeamName = []; 
            var leagueTeamLogo = []; 

            var leaguePlayerId = []; 
            var leaguePlayerName = []; 
            var leaguePlayerLogo = []; 
            var leaguePlayerNationality = []; 

            leagueName = users.Name; 
            leagueAreaName = users.AreaName; 
            leagueYear = users.CurrentSeason.Name; 

            for (var i = 0; i < users.Teams.length; i++) {
                leagueTeamId.push(users.Teams[i].TeamId); 
                leagueTeamName.push(users.Teams[i].Name); 
                leagueTeamLogo.push(users.Teams[i].WikipediaLogoUrl); 

                //console.log(users.Teams[i].Players); 
                for (var j = 0; j < users.Teams[i].Players.length; j++) {
                    leaguePlayerId.push(users.Teams[i].Players[j].PlayerId); 
                    leaguePlayerName.push(users.Teams[i].Players[j].CommonName); 
                    leaguePlayerLogo.push(users.Teams[i].Players[j].PhotoUrl); 
                    leaguePlayerNationality.push(users.Teams[i].Players[j].Nationality); 
                }
            }

            dispatch(fetchLeagueName(leagueName)); 
            dispatch(fetchLeagueAreaName(leagueAreaName)); 
            dispatch(fetchLeagueYear(leagueYear)); 

            dispatch(fetchLLeagueTeamId(leagueTeamId)); 
            dispatch(fetchLeagueTeamName(leagueTeamName)); 
            dispatch(fetchLeagueTeamLogo(leagueTeamLogo)); 

            dispatch(fetchLeaguePlayerId(leaguePlayerId)); 
            dispatch(fetchLeaguePlayerName(leaguePlayerName)); 
            dispatch(fetchLeaguePlayerLogo(leaguePlayerLogo)); 
            dispatch(fetchLeaguePlayerNationality(leaguePlayerNationality)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchLeagueContentFailure(errMsg)); 
        })
    }
}
