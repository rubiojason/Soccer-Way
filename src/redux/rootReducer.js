import { combineReducers } from 'redux'; 
import teamReducer from './TeamsState/TeamsReducer'; 
import PtReducer from './PlayersInTeam/PlayersTeamReducer'; 
import PsReducer from './PlayerSchedule/PlayerScheduleReducer'; 
import DmReducer from './DateForMatches/DateMatchesReducer'; 
import leagueReducer from './LeaguesState/LeaguesReducer';
import leagueContentReducer from './LeagueContent/LeagueContentReducer';
import playerReducer from './Player/PlayerReducer';

const rootReducer = combineReducers({
    team: teamReducer, 
    playerteam: PtReducer, 
    playerschedule: PsReducer, 
    date: DmReducer, 
    league: leagueReducer, 
    leaguecontent: leagueContentReducer, 
    player: playerReducer, 
})

export default rootReducer 
