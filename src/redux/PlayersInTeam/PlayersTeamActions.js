import { FETCH_PT_REQUEST, FETCH_PT_FAILURE, PLAYER_INDEX, PT_DATA } from './PlayersTeamTypes'; 
import axios from 'axios'; 


export const fetchPtRequest = () => {
    return {
        type: FETCH_PT_REQUEST
    }
} 

export const fetchPtFailure = error => {
    return {
        type: FETCH_PT_FAILURE, 
        payload: error
    }
} 

export const fetchPlayerIndex = data => {
    return {
        type: PLAYER_INDEX, 
        payload: data 
    }
}

export const fetchPtData = data => {
    return {
        type: PT_DATA, 
        payload: data, 
    }
}


export const fetchPlayersInTeam = id => {
    return (dispatch) => {
        dispatch(fetchPtRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/PlayersByTeam/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 
            dispatch(fetchPtData(users)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPtFailure(errMsg)); 
        })
    }
}
