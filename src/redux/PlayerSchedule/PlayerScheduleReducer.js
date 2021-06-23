import { FETCH_PS_REQUEST, FETCH_PS_FAILURE, PS_HOME_TEAM, 
    PS_HOME_CODE, PS_AWAY_TEAM, PS_AWAY_CODE } from './PlayerScheduleTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    hometeam: [], 
    homecode: [], 
    awayteam: [], 
    awaycode: [], 
}

const psReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PS_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case FETCH_PS_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload, 
            }

        case PS_HOME_TEAM: 
            return {
                ...state, 
                loading: false, 
                hometeam: action.payload, 
                error: '', 
            }

        case PS_HOME_CODE: 
            return {
                ...state, 
                loading: false, 
                homecode: action.payload, 
                error: '', 
            }

        case PS_AWAY_TEAM: 
            return {
                ...state, 
                loading: false, 
                awayteam: action.payload, 
                error: '', 
            }

        case PS_AWAY_CODE: 
            return {
                ...state, 
                loading: false, 
                awaycode: action.payload, 
                error: '', 
            }

        default: return state 
    }
}

export default psReducer; 
