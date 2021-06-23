import { FETCH_PLAYER_REQUEST, FETCH_PLAYER_FAILURE, PLAYER_ID, PLAYER_NAME, 
         PLAYER_LOGO, PLAYER_NUMBER, PLAYER_FOOT, PLAYER_NATIONALITY, 
         PLAYER_WEIGHT, PLAYER_HEIGHT } from './PlayerTypes'
import axios from 'axios'; 

export const fetchPlayerRequest = () => {
    return {
        type: FETCH_PLAYER_REQUEST, 
    }
}

export const fetchPlayerFailure = error => {
    return {
        type: FETCH_PLAYER_FAILURE, 
        payload: error, 
    }
}

export const fetchPlayerId = data => {
    return {
        type: PLAYER_ID, 
        payload: data, 
    }
}

export const fetchPlayerName = data => {
    return {
        type: PLAYER_NAME, 
        payload: data, 
    }
}

export const fetchPlayerLogo = data => {
    return {
        type: PLAYER_LOGO, 
        payload: data, 
    }
}

export const fetchPlayerNumber = data => {
    return {
        type: PLAYER_NUMBER, 
        payload: data, 
    }
}

export const fetchPlayerFoot = data => {
    return {
        type: PLAYER_FOOT, 
        payload: data, 
    }
}

export const fetchPlayerNationality = data => {
    return {
        type: PLAYER_NATIONALITY, 
        payload: data, 
    }
}

export const fetchPlayerWeight = data => {
    return {
        type: PLAYER_WEIGHT, 
        payload: data, 
    }
}

export const fetchPlayerHeight = data => {
    return {
        type: PLAYER_HEIGHT, 
        payload: data, 
    }
}

export const fetchPlayer = id => {
    return (dispatch) => {
        dispatch(fetchPlayerRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/Player/" + id + "?key=5f12486c770d409fb4a6901307ad99b4") 
        .then(res => {
            const users = res.data; 

            /*var leagueKey = []; 
            var leagueName = []; 
            var leagueCountry = [];*/

            var playerId = users.PlayerId; 
            var playerName = users.CommonName; 
            var playerLogo = users.PhotoUrl; 
            var playerNumber = users.Jersey; 
            var playerFoot = users.Foot; 
            var playerNationality = users.Nationality; 
            var playerWeight = users.Weight; 
            var playerHeight = users.Height; 

            dispatch(fetchPlayerId(playerId));
            dispatch(fetchPlayerName(playerName));  
            dispatch(fetchPlayerLogo(playerLogo));  
            dispatch(fetchPlayerNumber(playerNumber));  
            dispatch(fetchPlayerFoot(playerFoot));  
            dispatch(fetchPlayerNationality(playerNationality));  
            dispatch(fetchPlayerWeight(playerWeight));
            dispatch(fetchPlayerHeight(playerHeight));    
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPlayerFailure(errMsg)); 
        })
    }
}
