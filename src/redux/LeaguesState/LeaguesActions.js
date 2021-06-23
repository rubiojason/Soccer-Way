import { FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_FAILURE, LEAGUES_KEY, 
         LEAGUES_NAME, LEAGUES_COUNTRY, LEAGUE_KEY_CHOSEN } from "./LeaguesTypes";
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

export const fetchLeagueKey = data => {
    return {
        type: LEAGUES_KEY, 
        payload: data 
    }
}

export const fetchLeaguesName = data => {
    return {
        type: LEAGUES_NAME, 
        payload: data 
    }
}

export const fetchLeaguesCountry = data => {
    return {
        type: LEAGUES_COUNTRY, 
        payload: data 
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

            var leagueKey = []; 
            var leagueName = []; 
            var leagueCountry = []; 
             
            for (var i = 0; i < users.length; i++) {
                leagueKey.push(users[i].Key); 
                leagueName.push(users[i].Name); 
                leagueCountry.push(users[i].AreaName); 
            }
            dispatch(fetchLeagueKey(leagueKey)); 
            dispatch(fetchLeaguesName(leagueName)); 
            dispatch(fetchLeaguesCountry(leagueCountry)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchLeagueFailure(errMsg)); 
        })
    }
}
