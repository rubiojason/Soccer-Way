import { FETCH_PLAYER_REQUEST, FETCH_PLAYER_FAILURE, PLAYER_DATA } from './PlayerTypes'

const initialState = {
    loading: false, 
    error: '', 
    data: [], 
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

        case PLAYER_DATA: 
            return {
                ...state, 
                loading: false, 
                data: action.payload, 
                error: '', 
            }

        default: return state 
    }
}

export default playerReducer; 
