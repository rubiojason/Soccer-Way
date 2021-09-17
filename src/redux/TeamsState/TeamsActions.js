import { FETCH_TEAMS_FAILURE, FETCH_TEAMS_REQUEST, TEAM_DATA, 
         TEAM_INDEX, TEAM_SEARCH_RESULTS } from "./TeamsTypes"; 
import axios from 'axios'; 

export const fetchTeamsRequest = () => {
    return {
        type: FETCH_TEAMS_REQUEST
    }
}

export const fetchTeamsFailure = error => {
    return {
        type: FETCH_TEAMS_FAILURE, 
        payload: error
    }
}

export const getTeamData = data => {
    return {
        type: TEAM_DATA, 
        payload: data, 
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


export const fetchTeams = () => {
    return (dispatch) => {
        dispatch(fetchTeamsRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/Teams?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 
            dispatch(getTeamData(users));   
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchTeamsFailure(errMsg)); 
        })
    }
}
