import { FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_FAILURE, LEAGUE_DATA,
         LEAGUE_KEY_CHOSEN } from "./LeaguesTypes";

const initialState = {
    loading: false, 
    error: '', 
    data: [], 
    leaguekeychosen: "", 
}

const leagueReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_LEAGUES_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case FETCH_LEAGUES_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload, 
            }

        case LEAGUE_DATA: 
            return {
                ...state, 
                loading: false, 
                data: action.payload, 
                error: '', 
            }

        case LEAGUE_KEY_CHOSEN: 
            return {
                ...state, 
                leaguekeychosen: action.payload, 
            }

        default: return state 
    }
}

export default leagueReducer; 
