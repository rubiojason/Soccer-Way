import { FETCH_PLAYER_REQUEST, FETCH_PLAYER_FAILURE, PLAYER_ID, PLAYER_NAME, 
         PLAYER_LOGO, PLAYER_NUMBER, PLAYER_FOOT, PLAYER_NATIONALITY, 
         PLAYER_WEIGHT, PLAYER_HEIGHT } from './PlayerTypes'

const initialState = {
    loading: false, 
    error: '', 
    playerid: '', 
    playername: '', 
    playerlogo: '', 
    playernumber: '', 
    playerfoot: '', 
    playernationality: '', 
    playerweight: '', 
    playerheight: '', 
}

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PLAYER_REQUEST: 
            return {
                ...state, 
                loading: false, 
            }

        case FETCH_PLAYER_FAILURE: 
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
            }

        case PLAYER_NAME: 
            return {
                ...state, 
                loading: false, 
                playername: action.payload, 
            }

        case PLAYER_LOGO:
            return {
                ...state, 
                loading: false, 
                playerlogo: action.payload, 
            }

        case PLAYER_NUMBER: 
            return {
                ...state, 
                loading: false, 
                playernumber: action.payload, 
            }

        case PLAYER_FOOT: 
            return {
                ...state, 
                loading: false, 
                playerfoot: action.payload, 
            }

        case PLAYER_NATIONALITY: 
            return {
                ...state, 
                loading: false, 
                playernationality: action.payload, 
            }

        case PLAYER_WEIGHT: 
            return {
                ...state, 
                loading: false, 
                playerweight: action.payload, 
            }

        case PLAYER_HEIGHT: 
            return {
                ...state, 
                loading: false, 
                playerheight: action.payload, 
            }

        default: return state 
    }
}

export default playerReducer; 
