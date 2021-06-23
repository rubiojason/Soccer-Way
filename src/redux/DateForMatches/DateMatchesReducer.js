import { FETCH_DM_REQUEST, FETCH_DM_FAILURE, DM_HOME_TEAM, 
         DM_AWAY_TEAM, DM_HOME_TEAM_LOGO, DM_AWAY_TEAM_LOGO, 
         DM_HOME_TEAM_SCORE, DM_AWAY_TEAM_SCORE } from './DateMatchesTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    hometeam: [],
    hometeamlogo: [],  
    hometeamscore: [], 
    awayteam: [],
    awayteamlogo: [], 
    awayteamscore: [], 
}

const DmReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DM_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case FETCH_DM_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload, 
            }

        case DM_HOME_TEAM: 
            return {
                ...state, 
                loading: false, 
                hometeam: action.payload, 
            }

        case DM_AWAY_TEAM: 
            return {
                ...state, 
                loading: false, 
                awayteam: action.payload, 
            }

        case DM_HOME_TEAM_LOGO: 
            return {
                ...state, 
                hometeamlogo: action.payload, 
            }

        case DM_AWAY_TEAM_LOGO: 
            return {
                ...state, 
                awayteamlogo: action.payload, 
            }

        case DM_HOME_TEAM_SCORE: 
            return {
                ...state, 
                hometeamscore: action.payload, 
            }

        case DM_AWAY_TEAM_SCORE: 
            return {
                ...state, 
                awayteamscore: action.payload, 
            }

        default: return state 
    }
}

export default DmReducer; 
