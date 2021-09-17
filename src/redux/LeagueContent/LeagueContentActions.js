import { LEAGUE_CONTENT_REQUEST, LEAGUE_CONTENT_FAILURE, 
         LEAGUE_DATA, LEAGUE_PLAYER_SEARCH_INDEX } from "./LeagueContentTypes";
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

export const fetchLeagueData = data => {
    return {
        type: LEAGUE_DATA, 
        payload: data, 
    }
}

export const fetchLeaguePlayerSearchIndex = data => {
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

            dispatch(fetchLeagueData(users));  
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchLeagueContentFailure(errMsg)); 
        })
    }
}
