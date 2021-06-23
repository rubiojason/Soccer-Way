import { FETCH_TEAMS_FAILURE, FETCH_TEAMS_REQUEST, FETCH_TEAMS_SUCCESS, 
         TEAM_ID, TEAM_NAME, COUNTRY, VENUE_NAME, FOUND, COLORS, LOGO_URL, 
         TEAM_INDEX, TEAM_SEARCH_RESULTS, TEAM_FULL_NAME } from "./TeamsTypes"; 

const initialState = {
    loading: false, 
    users: [], 
    error: '', 
    teamid: '', 
    teamname: '', 
    teamcountry: '', 
    teamvenue: '', 
    found: '', 
    colors: '', 
    logourl: '', 
    teamindex: '', 
    teamidarr: '', 
    teamsearchresults: [], 
    teamidresults: [], 
    teamfullname: [], 
}

const teamReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TEAMS_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }
        case FETCH_TEAMS_SUCCESS: 
            return {
                ...state, 
                loading: false, 
                users: action.payload, 
                error: '', 
            }

        case FETCH_TEAMS_FAILURE: 
            return {
                ...state, 
                loading: false, 
                users: [], 
                error: action.payload, 
            }

        case TEAM_NAME: 
            return {
                ...state, 
                loading: false, 
                teamname: action.payload, 
                error: '', 
            }

        case TEAM_ID: 
            return {
                ...state, 
                loading: false, 
                teamid: action.payload, 
                error: '', 
            }

        case COUNTRY: 
            return {
                ...state, 
                loading: false, 
                teamcountry: action.payload, 
                error: '', 
            }

        case VENUE_NAME: 
            return {
                ...state, 
                loading: false, 
                teamvenue: action.payload, 
                error: '', 
            }

        case FOUND: 
            return {
                ...state, 
                loading: false, 
                found: action.payload, 
                error: '', 
            }

        case COLORS: 
            return {
                ...state, 
                loading: false, 
                colors: action.payload, 
                error: '', 
            }

        case LOGO_URL: 
            return {
                ...state, 
                loading: false, 
                logourl: action.payload, 
                error: '', 
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

        case TEAM_FULL_NAME: 
            return {
                ...state, 
                teamfullname: action.payload, 
            }

        default: return state 
    }
}

export default teamReducer 
