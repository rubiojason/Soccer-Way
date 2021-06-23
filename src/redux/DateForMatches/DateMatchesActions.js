import { FETCH_DM_REQUEST, FETCH_DM_FAILURE, DM_HOME_TEAM, 
         DM_AWAY_TEAM, DM_HOME_TEAM_LOGO, DM_AWAY_TEAM_LOGO, 
         DM_HOME_TEAM_SCORE, DM_AWAY_TEAM_SCORE } from './DateMatchesTypes'; 
import axios from 'axios'; 


export const fetchDmRequest = () => {
    return {
        type: FETCH_DM_REQUEST 
    }
}

export const fetchDmFailure = error => {
    return {
        type: FETCH_DM_FAILURE, 
        payload: error 
    }
}

export const fetchDmHomeTeam = data => {
    return {
        type: DM_HOME_TEAM, 
        payload: data 
    }
}

export const fetchDmAwayteam = data => {
    return {
        type: DM_AWAY_TEAM, 
        payload: data 
    }
}

export const fetchDmHomeTeamLogo = data => {
    return {
        type: DM_HOME_TEAM_LOGO, 
        payload: data 
    }
}

export const fetchDmAwayTeamLogo = data => {
    return {
        type: DM_AWAY_TEAM_LOGO, 
        payload: data 
    }
}

export const fetchDmHomeTeamScore = data => {
    return {
        type: DM_HOME_TEAM_SCORE, 
        payload: data 
    }
}

export const fetchDmAwayTeamScore = data => {
    return {
        type: DM_AWAY_TEAM_SCORE, 
        payload: data 
    }
}

export const fetchDateMatches = id => {
    return (dispatch) => {
        dispatch(fetchDmRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/GamesByDate/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 

            var homeTeam = []; 
            var awayTeam = []; 
            var homeTeamScore = []; 
            var awayTeamScore = []; 
             
            for (var i = 0; i < users.length; i++) {
                homeTeam.push(users[i].HomeTeamName); 
                awayTeam.push(users[i].AwayTeamName); 
                homeTeamScore.push(users[i].HomeTeamScore); 
                awayTeamScore.push(users[i].AwayTeamScore); 
            }
            dispatch(fetchDmHomeTeam(homeTeam)); 
            dispatch(fetchDmAwayteam(awayTeam)); 
            dispatch(fetchDmHomeTeamScore(homeTeamScore)); 
            dispatch(fetchDmAwayTeamScore(awayTeamScore)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchDmFailure(errMsg)); 
        })
    }
}
