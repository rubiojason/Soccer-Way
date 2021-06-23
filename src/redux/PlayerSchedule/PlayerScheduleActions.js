import { FETCH_PS_REQUEST, FETCH_PS_FAILURE, PS_HOME_TEAM, 
         PS_HOME_CODE, PS_AWAY_TEAM, PS_AWAY_CODE } from './PlayerScheduleTypes'; 
import axios from 'axios'; 

export const fetchPsRequest = () => {
    return {
        type: FETCH_PS_REQUEST 
    }
}

export const fetchPsFailure = error => {
    return {
        type: FETCH_PS_FAILURE, 
        payload: error 
    }
}

export const fetchHomeTeam = data => { 
    return {
        type: PS_HOME_TEAM, 
        payload: data 
    }
}

export const fetchHomeCode = data => {
    return {
        type: PS_HOME_CODE, 
        payload: data 
    }
}

export const fetchAwayTeam = data => {
    return {
        type: PS_AWAY_TEAM, 
        payload: data 
    }
}

export const fetchAwayCode = data => {
    return {
        type: PS_AWAY_CODE, 
        payload: data 
    }
}


export const fetchPlayerSchedule = id => {
    return (dispatch) => {
        dispatch(fetchPsRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/UpcomingScheduleByPlayer/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 

            var homeTeam = []; 
            var homeCode = []; 
            var awayTeam = []; 
            var awayCode = []; 
             
            for (var i = 0; i < users.length; i++) {
                homeTeam.push(users[i].HomeTeamName); 
                homeCode.push(users[i].HomeTeamCountryCode); 
                awayTeam.push(users[i].AwayTeamName); 
                awayCode.push(users[i].AwayTeamCountryCode); 
            }
            dispatch(fetchHomeTeam(homeTeam)); 
            dispatch(fetchHomeCode(homeCode)); 
            dispatch(fetchAwayTeam(awayTeam)); 
            dispatch(fetchAwayCode(awayCode)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPsFailure(errMsg)); 
        })
    }
}
