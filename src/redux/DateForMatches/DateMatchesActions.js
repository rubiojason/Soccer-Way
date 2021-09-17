import { FETCH_DM_REQUEST, FETCH_DM_FAILURE, DM_DATA  } from './DateMatchesTypes'; 
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

export const fetchDmData = data => {
    return {
        type: DM_DATA, 
        payload: data, 
    }
}

export const fetchDateMatches = id => {
    return (dispatch) => {
        dispatch(fetchDmRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/GamesByDate/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 

            dispatch(fetchDmData(users)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchDmFailure(errMsg)); 
        })
    }
}
