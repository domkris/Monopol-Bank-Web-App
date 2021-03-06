import React from 'react';
import './Components/Login/Login';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Game from './Components/Game/Game';
import About from './Components/About/About';
import {Route, Switch} from 'react-router-dom';

class App extends React.Component{

  render(){     
    return (
      <div className="shadow-box-example hoverable" >
        <Switch>  
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/game" exact component={Game} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>      
    );    
  }
}
export default App;