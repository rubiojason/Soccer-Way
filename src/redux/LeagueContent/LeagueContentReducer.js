import { LEAGUE_CONTENT_REQUEST, LEAGUE_CONTENT_FAILURE, 
         LEAGUE_DATA, LEAGUE_PLAYER_SEARCH_INDEX } from "./LeagueContentTypes";

const initialState = {
    loading: false, 
    error: '', 
    data: [],  
    leagueplayersearchindex: "", 
}

const leagueContentReducer = (state = initialState, action) => {
    switch(action.type) {
        case LEAGUE_CONTENT_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case LEAGUE_CONTENT_FAILURE: 
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
                error: "", 
            }

        case LEAGUE_PLAYER_SEARCH_INDEX: 
            return {
                ...state, 
                leagueplayersearchindex: action.payload, 
            }

        default: return state 
    }
}

export default leagueContentReducer; 
