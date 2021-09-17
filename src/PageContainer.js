import React from 'react'; 
import { BrowserRouter, Redirect ,Route, Switch } from 'react-router-dom';
import DateForMatchesPage from './work/DateForMatchesPage';
import ErrorPage from './work/ErrorPage';
import FindLeaguePage from './work/FindLeaguePage';
import LeagueContentPage from './work/LeagueContentPage';
import MainPage from './work/MainPage'; 
import PlayerPage from './work/PlayerPage';
import PlayerPage2 from './work/PlayerPage2';
import TeamSearchPage from './work/TeamSearchPage';
import TeamSearchResultsPage from './work/TeamSearchResultsPage';

function PageContainer() {
    return (
        <div >
            <BrowserRouter>
                <Switch>

                    <Redirect exact from="/SoccerWay" to="/Soccer-Way" />

                    <Route path="/Soccer-Way" exact component={MainPage} />

                    <Route path="/Soccer-Way/team-search" component={TeamSearchPage} />

                    <Route path="/Soccer-Way/team-page" component={TeamSearchResultsPage} />

                    <Route path="/Soccer-Way/player-page" component={PlayerPage} />

                    <Route path="/Soccer-Way/select-date-page" component={DateForMatchesPage} />

                    <Route path="/Soccer-Way/find-league-page" component={FindLeaguePage} />

                    <Route path="/Soccer-Way/league-content-page" component={LeagueContentPage} />

                    <Route path="/Soccer-Way/player-page-2" component={PlayerPage2} />

                    <Route path="*" component={ErrorPage} status={404} />

                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default PageContainer
