import { FETCH_PLAYER_REQUEST, FETCH_PLAYER_FAILURE, PLAYER_DATA } from './PlayerTypes'
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

export const getPlayerData = data => {
    return {
        type: PLAYER_DATA, 
        payload: data, 
    }
}

export const fetchPlayer = id => {
    return (dispatch) => {
        dispatch(fetchPlayerRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/Player/" + id + "?key=5f12486c770d409fb4a6901307ad99b4") 
        .then(res => {
            const users = res.data; 

            dispatch(getPlayerData(users));   
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPlayerFailure(errMsg)); 
        })
    }
}
