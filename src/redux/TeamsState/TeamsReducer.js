import { FETCH_TEAMS_FAILURE, FETCH_TEAMS_REQUEST, TEAM_DATA, 
         TEAM_INDEX, TEAM_SEARCH_RESULTS } from "./TeamsTypes"; 

const initialState = {
    loading: false, 
    teamdata: [], 
    error: '', 
    teamindex: '', 
    teamsearchresults: [], 
    teamidresults: [],
}

const teamReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TEAMS_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case FETCH_TEAMS_FAILURE: 
            return {
                ...state, 
                loading: false, 
                teamdata: [], 
                error: action.payload, 
            }
            
        case TEAM_DATA: 
            return {
                ...state, 
                loading: false, 
                teamdata: action.payload, 
                error: "", 
            }

        case TEAM_INDEX: 
            return {
                ...state, 
                teamindex: action.payload, 
            }

        case TEAM_SEARCH_RESULTS: 
            return {
                ...state, 
                teamsearchresults: action.payload, 
            }

        default: return state 
    }
}

export default teamReducer 
