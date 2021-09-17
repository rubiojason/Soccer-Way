import { FETCH_DM_REQUEST, FETCH_DM_FAILURE, DM_DATA  } from './DateMatchesTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    data: [], 
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

        case DM_DATA: 
            return {
                ...state, 
                loading: false, 
                data: action.payload, 
                error: '', 
            }

        default: return state 
    }
}

export default DmReducer; 
