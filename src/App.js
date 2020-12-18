import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Feed from './feed';
import Recipe from './recipeinfo';

const App = () => {
    return(
      <BrowserRouter>
      <div className="App">
      <Switch>
      <Route exact path="/" component={Feed}/>
      <Route path="/recipe/:id" component={Recipe}/>
      </Switch>
      </div>
      </BrowserRouter>
    )
}

export default App;
