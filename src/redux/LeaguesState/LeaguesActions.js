import { FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_FAILURE, LEAGUE_DATA,
         LEAGUE_KEY_CHOSEN } from "./LeaguesTypes";
import axios from 'axios'; 

export const fetchLeagueRequest = () => {
    return {
        type: FETCH_LEAGUES_REQUEST, 
    }
}

export const fetchLeagueFailure = error => {
    return {
        type: FETCH_LEAGUES_FAILURE, 
        payload: error 
    }
}

export const fetchLeagueData = data => {
    return {
        type: LEAGUE_DATA, 
        payload: data, 
    }
}

export const fetchLeagueKeyChosen = data => {
    return {
        type: LEAGUE_KEY_CHOSEN, 
        payload: data 
    }
}

export const fetchLeagues = () => {
    return (dispatch) => {
        dispatch(fetchLeagueRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/Competitions?key=5f12486c770d409fb4a6901307ad99b4") 
        .then(res => {
            const users = res.data; 

            dispatch(fetchLeagueData(users)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchLeagueFailure(errMsg)); 
        })
    }
}
