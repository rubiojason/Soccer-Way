import { FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_FAILURE, LEAGUES_KEY, 
         LEAGUES_NAME, LEAGUES_COUNTRY, LEAGUE_KEY_CHOSEN } from "./LeaguesTypes";

const initialState = {
    loading: false, 
    error: '', 
    leaguekey: [], 
    leaguename: [], 
    leaguecountry: [], 
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

        case LEAGUES_KEY: 
            return {
                ...state, 
                loading: false, 
                leaguekey: action.payload, 
                error: '', 
            }

        case LEAGUES_NAME: 
            return {
                ...state, 
                loading: false, 
                leaguename: action.payload, 
                error: '', 
            }

        case LEAGUES_COUNTRY: 
            return {
                ...state, 
                loading: false, 
                leaguecountry: action.payload, 
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
