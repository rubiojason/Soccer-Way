import { FETCH_PT_REQUEST, FETCH_PT_FAILURE, PLAYER_INDEX, PT_DATA } from './PlayersTeamTypes'; 

const initialState = {
    loading: false, 
    error: '', 
    data: [],  
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

        case PLAYER_INDEX: 
            return {
                ...state, 
                playerindex: action.payload, 
            }

        case PT_DATA: 
            return {
                ...state,
                loading: false,  
                data: action.payload, 
                error: '',  
            }
    
        default: return state 
    }
}
    
    export default PtReducer 
    