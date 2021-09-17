import { FETCH_PS_REQUEST, FETCH_PS_FAILURE, PS_DATA } from './PlayerScheduleTypes'; 
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

export const fetchPsData = data => {
    return {
        type: PS_DATA, 
        payload: data, 
    }
}


export const fetchPlayerSchedule = id => {
    return (dispatch) => {
        dispatch(fetchPsRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/UpcomingScheduleByPlayer/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 
            dispatch(fetchPsData(users)); 
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPsFailure(errMsg)); 
        })
    }
}
