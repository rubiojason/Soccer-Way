import { FETCH_PT_REQUEST, FETCH_PT_FAILURE, PLAYER_ID, 
         PLAYER_NAME, PLAYER_PHOTO, PLAYER_INDEX, PLAYER_NUMBER, 
         PLAYER_FOOT, PLAYER_HEIGHT, PLAYER_WEIGHT, PLAYER_NATION } from './PlayersTeamTypes'; 
import axios from 'axios'; 


export const fetchPtRequest = () => {
    return {
        type: FETCH_PT_REQUEST
    }
} 

export const fetchPtFailure = error => {
    return {
        type: FETCH_PT_FAILURE, 
        payload: error
    }
} 

export const fetchPlayerId = data => {
    return {
        type: PLAYER_ID, 
        payload: data 
    }
} 

export const fetchPlayerName = data => {
    return {
        type: PLAYER_NAME, 
        payload: data 
    }
} 

export const fetchPlayerPhoto = data => {
    return {
        type: PLAYER_PHOTO, 
        payload: data 
    }
} 

export const fetchPlayerNumber = data => {
    return {
        type: PLAYER_NUMBER, 
        payload: data 
    }
}

export const fetchPlayerFoot = data => {
    return {
        type: PLAYER_FOOT, 
        payload: data 
    }
}

export const fetchPlayerNation = data => {
    return {
        type: PLAYER_NATION, 
        payload: data 
    }
}

export const fetchPlayerHeight = data => {
    return {
        type: PLAYER_HEIGHT, 
        payload: data 
    }
}

export const fetchPlayerWeight = data => {
    return {
        type: PLAYER_WEIGHT, 
        payload: data 
    }
}

export const fetchPlayerIndex = data => {
    return {
        type: PLAYER_INDEX, 
        payload: data 
    }
}


export const fetchPlayersInTeam = id => {
    return (dispatch) => {
        dispatch(fetchPtRequest); 
        axios.get("https://fly.sportsdata.io/v3/soccer/scores/json/PlayersByTeam/" + id + "?key=5f12486c770d409fb4a6901307ad99b4")
        .then(res => {
            const users = res.data; 

            var playerId = []; 
            var playerName = []; 
            var playerPhoto = []; 

            var playerNumber = []; 
            var playerFoot = []; 
            var playerNation = []; 
            var playerHeight = []; 
            var playerWeight = []; 
             
            for (var i = 0; i < users.length; i++) {
                playerId.push(users[i].PlayerId); 
                playerName.push(users[i].CommonName); 
                playerPhoto.push(users[i].PhotoUrl); 

                playerNumber.push(users[i].Jersey); 
                playerFoot.push(users[i].Foot); 
                playerNation.push(users[i].Nationality); 
                playerHeight.push(users[i].Height); 
                playerWeight.push(users[i].Weight); 
            }
            dispatch(fetchPlayerId(playerId)); 
            dispatch(fetchPlayerName(playerName)); 
            dispatch(fetchPlayerPhoto(playerPhoto));
            
            dispatch(fetchPlayerNumber(playerNumber)); 
            dispatch(fetchPlayerFoot(playerFoot)); 
            dispatch(fetchPlayerNation(playerNation)); 
            dispatch(fetchPlayerHeight(playerHeight)); 
            dispatch(fetchPlayerWeight(playerWeight));  
            
        })
        .catch(err => {
            const errMsg = err.message; 
            dispatch(fetchPtFailure(errMsg)); 
        })
    }
}
