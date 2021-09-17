import { FETCH_PS_REQUEST, FETCH_PS_FAILURE, PS_DATA } from './PlayerScheduleTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    data: [], 
}

const psReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PS_REQUEST: 
            return {
                ...state, 
                loading: true, 
            }

        case FETCH_PS_FAILURE: 
            return {
                ...state, 
                loading: false, 
                error: action.payload, 
            }

        case PS_DATA: 
            return {
                ...state, 
                loading: false, 
                data: action.payload, 
                error: '', 
            }

        default: return state 
    }
}

export default psReducer; 
