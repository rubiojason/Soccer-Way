import { FETCH_PT_REQUEST, FETCH_PT_FAILURE, PLAYER_ID, 
    PLAYER_NAME, PLAYER_PHOTO, PLAYER_INDEX, PLAYER_NUMBER, 
    PLAYER_FOOT, PLAYER_HEIGHT, PLAYER_WEIGHT, PLAYER_NATION } from './PlayersTeamTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    playerid: [], 
    playername: [], 
    playerphoto: [], 

    playernumber: [], 
    playerfoot: [], 
    playernation: [], 
    playerheight: [], 
    playerweight: [], 

    playerindex: [], 
}
    
const PtReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PT_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }
    
        case FETCH_PT_FAILURE: 
            return {
                 ...state, 
                loading: false, 
                error: action.payload, 
            }
    
        case PLAYER_ID: 
            return {
                ...state, 
                loading: false, 
                playerid: action.payload, 
                error: '', 
            }
    
        case PLAYER_NAME: 
            return {
                ...state, 
                loading: false, 
                playername: action.payload, 
                error: '', 
            }
    
        case PLAYER_PHOTO: 
            return {
                ...state, 
                loading: false, 
                playerphoto: action.payload, 
                error: '', 
            }

        case PLAYER_NUMBER: 
            return {
                ...state, 
                loading: false, 
                playernumber: action.payload, 
                error: '', 
            }

        case PLAYER_FOOT: 
            return {
                ...state, 
                loading: false, 
                playerfoot: action.payload, 
                error: '', 
            }

        case PLAYER_NATION: 
            return {
                ...state, 
                loading: false, 
                playernation: action.payload, 
                error: '', 
            }

        case PLAYER_HEIGHT: 
            return {
                ...state, 
                loading: false, 
                playerheight: action.payload, 
                error: '', 
            }

        case PLAYER_WEIGHT: 
            return {
                ...state, 
                loading: false, 
                playerweight: action.payload, 
                error: '', 
            }

        case PLAYER_INDEX: 
            return {
                ...state, 
                playerindex: action.payload, 
            }
    
        default: return state 
    }
}
    
    export default PtReducer 
    