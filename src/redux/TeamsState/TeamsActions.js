import { FETCH_TEAMS_FAILURE, FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, 
         TEAM_ID, TEAM_NAME, COUNTRY, VENUE_NAME, FOUND, COLORS, LOGO_URL, 
         TEAM_INDEX, TEAM_SEARCH_RESULTS, TEAM_FULL_NAME } from "./TeamsTypes"; 
import axios from 'axios'; 

export const fetchTeamsRequest = () => {
    return {
        type: FETCH_TEAMS_REQUEST
    }
}

export const fetchTeamsSuccess = users => {
    return {
        type: FETCH_TEAMS_SUCCESS, 
        payload: users 
    }
}

export const fetchTeamsFailure = error => {
    return {
        type: FETCH_TEAMS_FAILURE, 
        payload: error
    }
}

export const fetchTeamId = data => {
    return {
        type: TEAM_ID, 
        payload: data 
    }
}

export const fetchTeamName = data => {
    return {
        type: TEAM_NAME, 
        payload: data 
    }
}

export const fetchTeamCountry = data => {
    return {
        type: COUNTRY, 
        payload: data 
    }
}

export const fetchTeamVenue = data => {
    return {
        type: VENUE_NAME, 
        payload: data 
    }
}

export const fetchTeamFound = data => {
    return {
        type: FOUND, 
        payload: data 
    }
}

export const fetchTeamColors = data => {
    return {
        type: COLORS, 
        payload: data 
    }
}

export const fetchTeamLogoUrl = data => {
    return {
        type: LOGO_URL, 
        payload: data 
    }
}

export const getTeamIndex = data => {
    return {
        type: TEAM_INDEX, 
        payload: data 
    }
}

export const getTeamSearchResults = data => {
    return {
        type: TEAM_SEARCH_RESULTS, 
        payload: data 
    }
}

export const fetchTeamFullName = data => {
    return {
        type: TEAM_FULL_NAME, 
        payload: data 
    }
}


export const fetchTeams = () => {
    return (dispatch) => {
        dispatch(fetchTeamsRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/Teams?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 
            dispatch(fetchTeamsSuccess(users)); 

            var teamName = []; 
            var teamId = []; 
            var teamCountry = []; 
            var teamVenue = []; 
            var teamFound = []; 
            var teamColors = []; 
            var teamLogoUrl = []; 
            var fullTeamName = []; 

            for (var i = 0; i < users.length; i++) {
                teamName.push(users[i].Name); 
                teamId.push(users[i].TeamId); 
                teamCountry.push(users[i].AreaName); 
                teamVenue.push(users[i].VenueName); 
                teamFound.push(users[i].Founded); 
                teamColors.push(users[i].ClubColor1); 
                teamColors.push(users[i].ClubColor2);
                teamLogoUrl.push(users[i].WikipediaLogoUrl); 
                fullTeamName.push(users[i].FullName); 
            }
            dispatch(fetchTeamId(teamId)); 
            dispatch(fetchTeamName(teamName)); 
            dispatch(fetchTeamCountry(teamCountry)); 
            dispatch(fetchTeamVenue(teamVenue)); 
            dispatch(fetchTeamFound(teamFound)); 
            dispatch(fetchTeamColors(teamColors)); 
            dispatch(fetchTeamLogoUrl(teamLogoUrl)); 
            dispatch(fetchTeamFullName(fullTeamName));     
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchTeamsFailure(errMsg)); 
        })
    }
}
