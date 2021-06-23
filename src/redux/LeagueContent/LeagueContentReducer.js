import { LEAGUE_CONTENT_REQUEST, LEAGUE_CONTENT_FAILURE, LEAGUE_NAME, 
         LEAGUE_AREA_NAME, LEAGUE_YEAR, LEAGUE_TEAM_ID, LEAGUE_TEAM_NAME, 
         LEAGUE_TEAM_LOGO, LEAGUE_PLAYER_ID, LEAGUE_PLAYER_NAME, LEAGUE_PLAYER_LOGO, 
         LEAGUE_PLAYER_NATIONALITY, LEAGUE_PLAYER_SEARCH_INDEX } from "./LeagueContentTypes";

const initialState = {
    loading: false, 
    error: '', 
    leaguename: '', 
    leagueareaname: '', 
    leagueyear: '', 
    leagueteamid: [], 
    leagueteamname: [], 
    leagueteamlogo: [], 
    leagueplayerid: [], 
    leagueplayername: [], 
    leagueplayerlogo: [], 
    leagueplayernationality: [], 

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
                loading: false, 
                error: action.payload, 
            }

        case LEAGUE_NAME: 
            return {
                ...state, 
                loading: false, 
                leaguename: action.payload, 
                error: '', 
            }

        case LEAGUE_AREA_NAME: 
            return {
                ...state, 
                loading: false, 
                leagueareaname: action.payload, 
                error: '', 
            }

        case LEAGUE_YEAR: 
            return {
                ...state, 
                loading: false, 
                leagueyear: action.payload, 
                error: '', 
            }

        case LEAGUE_TEAM_ID: 
            return {
                ...state, 
                loading: false, 
                leagueteamid: action.payload, 
                error: '', 
            }

        case LEAGUE_TEAM_NAME: 
            return {
                ...state, 
                loading: false, 
                leagueteamname: action.payload, 
                error: '', 
            }

        case LEAGUE_TEAM_LOGO: 
            return {
                ...state, 
                loading: false, 
                leagueteamlogo: action.payload, 
                error: '', 
            }

        case LEAGUE_PLAYER_ID: 
            return {
                ...state, 
                loading: false, 
                leagueplayerid: action.payload, 
                error: '', 
            }
        
        case LEAGUE_PLAYER_NAME: 
            return {
                ...state, 
                loading: false, 
                leagueplayername: action.payload, 
                error: '', 
            }

        case LEAGUE_PLAYER_LOGO: 
            return {
                ...state, 
                loading: false, 
                leagueplayerlogo: action.payload, 
                error: '',  
            }

        case LEAGUE_PLAYER_NATIONALITY: 
            return {
                ...state, 
                loading: false, 
                leagueplayernationality: action.payload, 
                error: '', 
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
