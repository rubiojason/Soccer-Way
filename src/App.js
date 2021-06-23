import './main.scss';
import './teamsearch.scss'; 
import './teamresults.scss'; 
import './player.scss'; 
import './dateformatchespage.scss'; 
import './findleague.scss'; 
import './leaguecontent.scss'; 
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import { Route, Switch } from 'react-router-dom';
import PageContainer from './PageContainer';

function App() {

  return (
    <Switch>
      <Provider store={store}>
        <div className="App">
          <Route path="/" component={PageContainer} />
        </div>
      </Provider>
    </Switch>
    
  );
}

export default App;
